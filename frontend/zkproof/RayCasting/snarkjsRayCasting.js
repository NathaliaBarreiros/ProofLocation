import { exportCallDataGroth16 } from "../snarkjsZkproof";

export async function rayCastingCalldata(n, point, polygon) {
  const input = {
    n: n,
    point: point,
    polygon: polygon
  };

  let dataResult;

  try {
    dataResult = await exportCallDataGroth16(
      input,
      "/zkproof/RayCasting.wasm",
      "/zkproof/RayCasting_final.zkey"
    );
  } catch (error) {
    console.log(error);
    window.alert("Wrong answer");
  }

  return dataResult;
}
