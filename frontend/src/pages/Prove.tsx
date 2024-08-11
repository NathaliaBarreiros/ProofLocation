import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { VERIFIER_ABI, VERIFIER_ADDRESS } from '../../constants';
import { rayCastingCalldata } from '../../zkproof/RayCasting/snarkjsRayCasting';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { transformCoordinates, transformSingleCoordinate, transformPolygonPoint } from '../utils';

interface Ethereum extends ethers.Eip1193Provider {
  request(args: { method: string; params?: readonly unknown[] | object }): Promise<unknown>;
  on(eventName: string | symbol, listener: (...args: unknown[]) => void): void;
  removeListener(eventName: string | symbol, listener: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}

type CallData = {
  a: string[];
  b: string[][];
  c: string[];
  Input: string[];
};

// New type for verification result
type VerificationResult = {
  proofIsValid: boolean;
  pointIsInside: boolean;
} | null;

function Proove() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null);
  const [error, setError] = useState<string | null>(null);
  const polygon = useSelector((state: RootState) => state.map.bounds)
  
  const infuraProvider = useMemo(() => {
    const infuraProjectId = import.meta.env.VITE_INFURA_PROJECT_ID;
    if (!infuraProjectId) {
      console.error('Infura Project ID is not set');
      return null;
    }
    try {
      return new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraProjectId}`);
    } catch (error) {
      console.error('Failed to initialize Infura provider:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          
          const network = await provider.getNetwork();
          if (network.chainId !== 11155111n) { // Sepolia chain ID
            setError("Please connect to Sepolia testnet in MetaMask.");
            return;
          }

          const newSigner = await provider.getSigner();

          const newContract = new ethers.Contract(VERIFIER_ADDRESS, VERIFIER_ABI, newSigner);
          setContract(newContract);
        } catch (err) {
          console.error("Failed to connect wallet:", err);
          setError("Failed to connect wallet. Using Infura as fallback.");
          initializeWithInfura();
        }
      } else {
        console.log("MetaMask not detected. Using Infura as fallback.");
        initializeWithInfura();
      }
    };

    const initializeWithInfura = () => {
      if (infuraProvider) {
        const newContract = new ethers.Contract(VERIFIER_ADDRESS, VERIFIER_ABI, infuraProvider);
        setContract(newContract);
      } else {
        setError("Failed to initialize with Infura. Please check your internet connection.");
      }
    };

    connectWallet();
  }, [infuraProvider]);

  const proveLocation = async () => {
    if (!contract) {
      setError("Contract not initialized. Please connect your wallet to Sepolia.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const n = 4; // Number of vertices in the polygon
      const point = {lat: latitude, lng: longitude}; // Example point, you might want to use latitude and longitude here
      const validPoint = transformSingleCoordinate(point, polygon);
      const validPolygon = transformCoordinates(point, polygon);

      const res = transformPolygonPoint(polygon, point);

      const transformedPolygon = res.poligonoTransformado;
      const transformedPoint = res.coordenadaTransformada;

      const validTransformedPoint : [number, number] = [transformedPoint[0], transformedPoint[1]];

      console.log("Polígono transformado:", res.poligonoTransformado);
      console.log("Coordenada transformada:", res.coordenadaTransformada);  

      console.log("polygon is: ", polygon);
      const paddedPolygonList = [...transformedPolygon, ...Array(12 - transformedPolygon.length).fill([0, 0])];
      const validCalldata = await rayCastingCalldata(n, validTransformedPoint, paddedPolygonList) as CallData;
      console.log("Generated validCallData:", validCalldata);

      // const paddedPolygon = [...validPolygon, ...Array(12 - validPolygon.length).fill([0, 0])]
      // const callData = await rayCastingCalldata(n, validPoint, paddedPolygon) as CallData;
      // console.log("Generated callData:", callData);

      if (validCalldata) {
        const a = validCalldata.a.map(x => BigInt(x).toString());
        const b = validCalldata.b.map(row => row.map(x => BigInt(x).toString()));
        const c = validCalldata.c.map(x => BigInt(x).toString());
        const Input = validCalldata.Input.map(x => BigInt(x).toString());

        console.log('Sending to contract:', { a, b, c, Input });

        const proofIsValid = await contract.verifyProof(a, b, c, Input);
        const pointIsInside = Input[0] === "1";

        setVerificationResult({
          proofIsValid,
          pointIsInside
        });

        console.log("Proof is valid?:", proofIsValid);
        console.log("Point is inside polygon?:", pointIsInside);
      }
      // 
      // if (callData) {
      //   const a = callData.a.map(x => BigInt(x).toString());
      //   const b = callData.b.map(row => row.map(x => BigInt(x).toString()));
      //   const c = callData.c.map(x => BigInt(x).toString());
      //   const Input = callData.Input.map(x => BigInt(x).toString());

      //   console.log('Sending to contract:', { a, b, c, Input });

      //   const proofIsValid = await contract.verifyProof(a, b, c, Input);
      //   const pointIsInside = Input[0] === "1";

      //   setVerificationResult({
      //     proofIsValid,
      //     pointIsInside
      //   });

      //   console.log("Proof is valid?:", proofIsValid);
      //   console.log("Point is inside polygon?:", pointIsInside);
      // }
    } catch (error) {
      console.error("Error during proof generation or verification:", error);
      setError("Error proving location. Please try again.");
      setVerificationResult(null);
    } finally {
      setIsLoading(false);
    }
  };

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
      <h1>RayCasting Proof Verification on Sepolia</h1>
      <h2>Latitude: {latitude}</h2>
      <h2>Longitude: {longitude}</h2>
      <button onClick={proveLocation} disabled={isLoading || !contract}>
        {isLoading ? "Proving..." : "Prove Location"}
      </button>
      {verificationResult !== null && (
        <div>
          <p>Proof Verification: {verificationResult.proofIsValid ? "Valid" : "Invalid"}</p>
          <p>Point is {verificationResult.pointIsInside ? "inside" : "outside"} the polygon</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </>
  )
}

export default Proove
