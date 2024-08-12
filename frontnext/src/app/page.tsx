'use client'
import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { VERIFIER_ABI, VERIFIER_ADDRESS } from '../../constants';
import { rayCastingCalldata } from '../../zkproof/RayCasting/snarkjsRayCasting';
import { JsonRpcSigner } from 'ethers';

function Home() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // const [signer, setSigner] = useState<JsonRpcSigner>();
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [error, setError] = useState<string | null>(null);


  const polygon = useMemo(() => [[1,1],[4,1],[5,3],[4,5],[1,5]], []);

  // const provider = useMemo(() => {
  //   return new ethers.JsonRpcProvider('http://localhost:8545');
  // }, [])

  const provider = useMemo(() => {
    const infuraProjectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
    if (!infuraProjectId) {
      console.error('Infura Project ID is not set');
      return null;
    }
    // Use Sepolia testnet
    return new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraProjectId}`);
  }, []);
  
  const contract =  useMemo(() => {
    if (signer != null) {
      return new ethers.Contract(VERIFIER_ADDRESS, VERIFIER_ABI, signer)
    }
  },[signer]);

  // useEffect(() => {
  //   // const getSigner = async () => {
  //   //   if (signer == null) {
  //   //     const s =  await provider.getSigner(0);
  //   //     setSigner(s)
  //   //   }
  //   // }
  //   const proveLocation = async () => {
  //     const callData = await rayCastingCalldata([10, 3],  polygon);
  //     console.log("aqui calldata: ", callData);
  //     // if (callData !== undefined && contract != null){
  //     if (callData !== undefined && contract != null){
  //       console.log("Calling contract with:", callData);
  //       const contractRes = await contract.verifyProof(callData?.a, callData?.b, callData?.c, callData.Input);
  //       console.log("Contract res is:", contractRes);
  //     }
  //   }
    
  //   if (latitude != null && longitude != null){
  //     // getSigner()
  //     proveLocation()
  //   }
  // }, [latitude, longitude, polygon, contract, provider, signer])

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   });
  // }, [])

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const newSigner = await provider.getSigner();
          setSigner(newSigner);
        } catch (err) {
          console.error("Failed to connect wallet:", err);
          setError("Failed to connect wallet. Please make sure MetaMask is installed and connected to Sepolia.");
        }
      } else {
        setError("MetaMask not detected. Please install MetaMask and connect to Sepolia testnet.");
      }
    };

    connectWallet();
  }, []);

  useEffect(() => {
    const proveLocation = async () => {
      if (!signer || !contract) {
        console.log("Signer or contract not available yet");
        return;
      }

      try {
        const callData = await rayCastingCalldata([10, 3], polygon);
        console.log("aqui calldata: ", callData);
        
        if (callData !== undefined) {
          console.log("Calling contract with:", callData);
          const contractRes = await contract.verifyProof(callData.a, callData.b, callData.c, callData.Input);
          console.log("Contract res is:", contractRes);
        }
      } catch (err) {
        console.error("Error proving location:", err);
        setError("Error proving location. Please try again.");
      }
    };

    if (latitude !== 0 && longitude !== 0 && signer && contract) {
      proveLocation();
    }
  }, [latitude, longitude, polygon, contract, signer]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      err => {
        console.error("Error getting geolocation:", err);
        setError("Failed to get your location. Please enable location services and try again.");
      }
    );
  }, []);


  return (
    <>
      <h1>Proove</h1>
      <h2>Latitude: {latitude}</h2>
      <h2>Longitude: {longitude}</h2>
    </>
  )
}

export default Home
