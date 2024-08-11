import { exportCallDataGroth16 } from "../snarkjsZkproof";

export async function rayCastingCalldata(
  n: number,
  point: [number, number], 
  polygon: number[][]
) {
  const input = {
    n: n,
    point: point,
    polygon: polygon
  };

  let dataResult;

  try {
    // Asegúrate de que estas rutas son correctas y los archivos son accesibles
    const wasmPath = "/zkproof/RayCasting.wasm";
    const zkeyPath = "/zkproof/RayCasting_final.zkey";

    // Verifica si los archivos existen
    await Promise.all([
      fetch(wasmPath).then(res => {
        if (!res.ok) throw new Error(`Failed to load ${wasmPath}`);
      }),
      fetch(zkeyPath).then(res => {
        if (!res.ok) throw new Error(`Failed to load ${zkeyPath}`);
      })
    ]);

    const dataResult = await exportCallDataGroth16(
      input,
      wasmPath,
      zkeyPath
    );
    // dataResult = await exportCallDataGroth16(
    //   input,
    //   "/zkproof/RayCasting.wasm",
    //   "/zkproof/RayCasting_final.zkey"
    // );

    console.log("Calldata snarkjs:", dataResult);
    return dataResult;
  } catch (error) {
    console.error("Error in rayCastingCalldata:", error);
    throw new Error("Failed to generate or export calldata");
  }
}
