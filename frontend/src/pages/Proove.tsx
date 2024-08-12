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
      const callData = await rayCastingCalldata(transformSingleCoordinate({lat: latitude, lng: longitude}), transformCoordinates(polygon) );
      console.log(callData);
      if (callData !== undefined && contract != null){
        const contractRes = await contract.verifyProof(callData?.a, callData?.b, callData?.c, callData.Input);
        console.log("Contract res is:", contractRes);
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
      <h1>Proove</h1>
      <h2>Latitude: {latitude}</h2>
      <h2>Longitude: {longitude}</h2>
    </>
  )
}

export default Proove
