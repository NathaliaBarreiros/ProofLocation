import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import { VERIFIER_ABI, VERIFIER_ADDRESS } from '../constants';
import { rayCastingCalldata } from '../zkproof/RayCasting/snarkjsRayCasting';
import { JsonRpcSigner } from 'ethers';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [signer, setSigner] = useState<JsonRpcSigner>();

  const polygon = useMemo(() => [[1,1],[4,1],[5,3],[4,5],[1,5]], []);

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
      const callData = await rayCastingCalldata([3, 3],  polygon);
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
      <h1>App</h1>
      <h2>Latitude: {latitude}</h2>
      <h2>Longitude: {longitude}</h2>
    </>
  )
}

export default App
