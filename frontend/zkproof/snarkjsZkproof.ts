import { groth16 } from "snarkjs";

export async function exportCallDataGroth16(input: { point: number[], polygon: number[][] }, wasmPath: string, zkeyPath: string) {

  // 1. Genera la prueba ZK basada en tus entradas y circuito.
  const { proof: _proof, publicSignals: _publicSignals } =
    await groth16.fullProve(input, wasmPath, zkeyPath);

  // 2. Convierte la prueba a un formato que puede ser usado en un contrato Solidity.
  const calldata = await groth16.exportSolidityCallData(_proof, _publicSignals);

  // 3. Procesa los datos para que sean más fáciles de usar
  const argv = calldata 
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map((x: string) => BigInt(x).toString());

  // 4. Estructura los datos en el formato esperado por el contrato Solidity
  const a = [argv[0], argv[1]];
  const b = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ];
  const c = [argv[6], argv[7]];
  const Input = [];

  for (let i = 8; i < argv.length; i++) {
    Input.push(argv[i]);
  }

  return { a, b, c, Input };
}
