import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { VERIFIER_ABI, VERIFIER_ADDRESS } from '../../constants';
import { rayCastingCalldata } from '../../zkproof/RayCasting/snarkjsRayCasting';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { transformPolygonPoint } from '../utils';

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

type VerificationResult = {
  proofIsValid: boolean;
  pointIsInside: boolean;
} | null;

type SimpleCoordinate = {
  x: string;
  y: string;
};

type SimpleVertex = SimpleCoordinate;

function Prove() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null);
  const [error, setError] = useState<string | null>(null);
  const polygon = useSelector((state: RootState) => state.map.bounds)

  const [hasProvedGeo, setHasProvedGeo] = useState(false);
  const [hasProvedManual, setHasProvedManual] = useState(false);
  
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
    setHasProvedGeo(false);

    try {
      const n = 4; // Number of vertices in the polygon
      const point = {lat: latitude, lng: longitude};

      const res = transformPolygonPoint(polygon, point);

      const transformedPolygon = res.poligonoTransformado;
      const transformedPoint = res.coordenadaTransformada;

      const validTransformedPoint: [number, number] = [transformedPoint[0], transformedPoint[1]];

      console.log("Transformed Polygon:", res.poligonoTransformado);
      console.log("Transformed Coordinate:", res.coordenadaTransformada);  

      console.log("Polygon is: ", polygon);
      const paddedPolygonList = [...transformedPolygon, ...Array(12 - transformedPolygon.length).fill([0, 0])];
      const validCalldata = await rayCastingCalldata(n, validTransformedPoint, paddedPolygonList) as CallData;
      console.log("Generated validCallData:", validCalldata);

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
        setHasProvedGeo(true);

        console.log("Is proof valid?:", proofIsValid);
        console.log("Is point inside polygon?:", pointIsInside);
      }
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

  const [vertices, setVertices] = useState<SimpleVertex[]>([
    { x: '', y: '' },
    { x: '', y: '' },
    { x: '', y: '' },
    { x: '', y: '' },
  ]);
  const [point, setPoint] = useState<SimpleCoordinate>({ x: '', y: '' });

  const handleVertexChange = (index: number, coord: 'x' | 'y', value: string) => {
    const newVertices = [...vertices];
    newVertices[index][coord] = value;  // Mantener como string
    setVertices(newVertices);
  };
  
  const handlePointChange = (coord: 'x' | 'y', value: string) => {
    setPoint({ ...point, [coord]: value });  // Mantener como string
  };

  const handleTestPosition = async () => {
    if (!contract) {
      setError("Contract not initialized. Please connect your wallet to Sepolia.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasProvedManual(false)
    console.log("Vertices:", vertices);
    console.log("Point to test:", point);

    try {
      const n = 4; // Number of vertices in the polygon

    const manualPolygon = {
      topLeft: { lat: Number(vertices[0].y), lng: Number(vertices[0].x) },
      topRight: { lat: Number(vertices[1].y), lng: Number(vertices[1].x) },
      bottomLeft: { lat: Number(vertices[2].y), lng: Number(vertices[2].x) },
      bottomRight: { lat: Number(vertices[3].y), lng: Number(vertices[3].x) },
    };

    const pointToTest = { lat: Number(point.y), lng: Number(point.x) };

    const res = transformPolygonPoint(manualPolygon, pointToTest);

      const transformedPolygon = res.poligonoTransformado;
      const transformedPoint: [number, number] = [
        res.coordenadaTransformada[0],
        res.coordenadaTransformada[1]
      ];
    
      console.log("Transformed Polygon:", transformedPolygon);
      console.log("Transformed Point:", transformedPoint);

      const paddedPolygonList = [
        ...transformedPolygon,
        ...Array(12 - transformedPolygon.length).fill([0, 0])
      ] as [number, number][];

      const callData = await rayCastingCalldata(n, transformedPoint, paddedPolygonList) as CallData;
      console.log("Generated callData:", callData);
      
      if (callData) {
        const a = callData.a.map(x => BigInt(x).toString());
        const b = callData.b.map(row => row.map(x => BigInt(x).toString()));
        const c = callData.c.map(x => BigInt(x).toString());
        const Input = callData.Input.map(x => BigInt(x).toString());

        console.log('Sending to contract:', { a, b, c, Input });

        const proofIsValid = await contract.verifyProof(a, b, c, Input);
        const pointIsInside = Input[0] === "1";

        setVerificationResult({
          proofIsValid,
          pointIsInside
        });
        setHasProvedManual(true)

        console.log("Is proof valid?:", proofIsValid);
        console.log("Is point inside polygon?:", pointIsInside);
      }
    } catch (err) {
      console.error("Error proving location:", err);
      setError("Error proving location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>RayCasting Proof Verification on Sepolia</h1>
      <h2>Latitude: {latitude}</h2>
      <h2>Longitude: {longitude}</h2>
      <button 
        onClick={proveLocation} 
        disabled={isLoading || !contract}
      >
        {isLoading ? "Proving..." : "Prove Location"}
      </button>

      {hasProvedGeo && verificationResult !== null && (
        <div>
          <p>Proof Verification: {verificationResult.proofIsValid ? "Valid" : "Invalid"}</p>
          <p>Point is {verificationResult.pointIsInside ? "inside" : "outside"} the polygon</p>
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h2 style={{ textAlign: 'center' }}>Manual Vertex and Point Input</h2>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {vertices.map((vertex, index) => (
          <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <label style={{ minWidth: '80px' }}>Vertex {index + 1}: </label>
              <input
            type="number"
            value={vertex.x}
            onChange={(e) => handleVertexChange(index, 'x', e.target.value)}
            placeholder="x"
            style={{ width: '60px', marginRight: '5px' }}
            />
            <input
            type="number"
            value={vertex.y}
            onChange={(e) => handleVertexChange(index, 'y', e.target.value)}
            placeholder="y"
            style={{ width: '60px' }}
            />
          </div>
        ))}

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <label style={{ minWidth: '80px' }}>Point: </label>
        <input
          type="number"
          value={point.x}
          onChange={(e) => handlePointChange('x', e.target.value)}
          placeholder="x"
          style={{ width: '60px', marginRight: '5px' }}
        />
        <input
          type="number"
          value={point.y}
          onChange={(e) => handlePointChange('y', e.target.value)}
          placeholder="y"
          style={{ width: '60px' }}
        />
      </div>

      <button onClick={handleTestPosition} style={{ marginTop: '10px' }}>
        Test Manual Position
      </button>
      </div>
      
      {hasProvedManual && verificationResult !== null && (
        <div>
          <p>Proof Verification: {verificationResult.proofIsValid ? "Valid" : "Invalid"}</p>
          <p>Point is {verificationResult.pointIsInside ? "inside" : "outside"} the polygon</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Prove;
