import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { VERIFIER_ABI, VERIFIER_ADDRESS } from '../../constants';
import { rayCastingCalldata } from '../../zkproof/RayCasting/snarkjsRayCasting';
import { JsonRpcSigner } from 'ethers';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { transformCoordinates, transformSingleCoordinate } from '../utils';

function Proove() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [message, setMessage] = useState('');
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const polygon = useSelector((state: RootState) => state.map.bounds)

  const provider = useMemo(() => {
    return new ethers.JsonRpcProvider('http://localhost:8545');
  }, [])
  
  const contract =  useMemo(() => {
    if (signer != null) {
      return new ethers.Contract(VERIFIER_ADDRESS, VERIFIER_ABI, signer)
    }
  },[signer]);

  useEffect(() => {
    const getSigner = async () => {
      if (signer == null) {
        const s =  await provider.getSigner(0);
        setSigner(s)
      }
    }
    const proveLocation = async () => {
      console.log("point before is: ", {lat: latitude, lng: longitude});
      console.log("polygon befores is: ", polygon);
      const point = transformSingleCoordinate({lat: latitude, lng: longitude}, polygon);
      const finalPolygon = [...transformCoordinates(polygon), [0,0]]
      console.log("point is:", point);
      console.log("final polygon is:", finalPolygon);
      const callData = await rayCastingCalldata(point, finalPolygon);
      console.log(callData);
      if (callData !== undefined && contract != null){
        const contractRes = await contract.verifyProof(callData?.a, callData?.b, callData?.c, callData.Input);
        console.log("Contract res is:", contractRes);
        setMessage(contractRes ? 'You are in the polygon' : 'You are not in the polygon');
      }
    }
    
    if (latitude != null && longitude != null){
      getSigner()
      proveLocation()
    }
  }, [latitude, longitude, polygon, contract, provider, signer])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, [])

  return (
    <>
      <h1>Prove</h1>
      <h2>Latitude: {latitude}</h2>
      <h2>Longitude: {longitude}</h2>
      { message !== '' ?
          <h2 style={{fontWeight: 'bold'}}>{message}</h2> :
          <h2>...proving</h2>
      }
    </>
  )
}

export default Proove
