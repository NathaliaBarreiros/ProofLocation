import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import { VERIFIER_ABI, VERIFIER_ADDRESS } from '../constants';
import { rayCastingCalldata } from '../zkproof/RayCasting/snarkjsRayCasting';
import { JsonRpcSigner } from 'ethers';
import { BigNumberish } from 'ethers';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [signer, setSigner] = useState<JsonRpcSigner>();
  // added 
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);


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
    //before
    // const proveLocation = async () => {


    //   const callData = await rayCastingCalldata([9, 3],  polygon);
    //   console.log('calldata:', callData);

    //   // const _pA: [BigNumberish, BigNumberish] = [callData[0][0], callData[0][1]] as [BigNumberish, BigNumberish];
    //   // const _pB: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]] = [[callData[1][0][0], callData[1][0][1]],
    //   //   [callData[1][1][0], callData[1][1][1]]] as [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]];
    //   // const _pC: [BigNumberish, BigNumberish] = [callData[2][0], callData[2][1]] as [BigNumberish, BigNumberish];
    //   // const _pubSignals: BigNumberish[] = callData[3] as BigNumberish[];

    //   if (callData !== undefined && contract != null){
    //     const contractRes = await contract.verifyProof(callData?.a, callData?.b, callData?.c, callData.Input);

    //     // const contractRes = await contract.verifyProof(_pA, _pB, _pC, _pubSignals);

    //     console.log("Contract res is:", contractRes);
    //   }
    // }

    const proveLocation = async (x: number, y: number) => {
      if(!contract) return;

      setIsLoading(true);

      try{
        //
        const callData = await rayCastingCalldata([x, y], polygon);
        console.log('Generated callData:', callData);

        if (callData) {
          // Convertir los valores a BigInt
          // const a = callData.a.map(BigInt);
          // const b = callData.b.map(row => row.map(BigInt));
          // const c = callData.c.map(BigInt);
          // const Input = callData.Input.map(BigInt);
          const a = callData.a.map(x => BigInt(x).toString());
          const b = callData.b.map(row => row.map(x => BigInt(x).toString()));
          const c = callData.c.map(x => BigInt(x).toString());
          const Input = callData.Input.map(x => BigInt(x).toString());
  
          console.log('Sending to contract:', { a, b, c, Input });
  
          const contractRes = await contract.verifyProof(a, b, c, Input);
          setVerificationResult(contractRes);

          console.log("Verification result:", contractRes);
        }
      }catch(error){
        console.error("Error during proof generation or verification:", error);
        setVerificationResult(false);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (latitude != null && longitude != null){
      getSigner()
      proveLocation(3,3)
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
