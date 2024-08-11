// const { assert } = require("chai");
// const wasm_tester = require("circom_tester").wasm;

// import { assert } from 'chai';
// import { wasm as wasm_tester } from 'circom_tester';

// test V1
// describe("RayCasting circuit", function () {
//   let raycastingCircuit;

//   before(async function () {
//     raycastingCircuit = await wasm_tester("ProofLocation/RayCasting.circom");
//   });

//   it("Should generate the witness successfully for a point inside the polygon", async function () {
//     let input = {
//       point: [2, 2],
//       polygon: [
//         [0, 0],
//         [4, 0],
//         [4, 4],
//         [0, 4],
//         [0, 0]
//       ]
//     };
//     const witness = await raycastingCircuit.calculateWitness(input);
//     await raycastingCircuit.assertOut(witness, {isInside: 1});
//   });

//   it("Should generate the witness successfully for a point outside the polygon", async function () {
//     let input = {
//       point: [5, 5],
//       polygon: [
//         [0, 0],
//         [4, 0],
//         [4, 4],
//         [0, 4],
//         [0, 0]
//       ]
//     };
//     const witness = await raycastingCircuit.calculateWitness(input);
//     await raycastingCircuit.assertOut(witness, {isInside: 0});
//   });

//   it("Should generate the witness successfully for a point on the polygon edge", async function () {
//     let input = {
//       point: [0, 2],
//       polygon: [
//         [0, 0],
//         [4, 0],
//         [4, 4],
//         [0, 4],
//         [0, 0]
//       ]
//     };
//     const witness = await raycastingCircuit.calculateWitness(input);
//     await raycastingCircuit.assertOut(witness, {isInside: 1});
//   });

// //   it("Should handle a polygon with incorrect number of vertices", async function () {
// //     let input = {
// //       point: [2, 2],
// //       polygon: [
// //         [0, 0],
// //         [4, 0],
// //         [4, 4],
// //         [0, 4]
// //       ]
// //     };
// //     const witness = await raycastingCircuit.calculateWitness(input);
// //     // Aquí deberíamos verificar el comportamiento esperado.
// //     // Por ejemplo, podríamos verificar que isInside es 0 o 1, dependiendo de cómo
// //     // queremos que el circuito maneje este caso.
// //     await raycastingCircuit.assertOut(witness, {});
// //   });


//   it("Should fail for a polygon with incorrect number of vertices", async function () {
//     let input = {
//       point: [2, 2],
//       polygon: [
//         [0, 0],
//         [4, 0],
//         [4, 4],
//         [0, 4]
//       ]
//     };
//     try {
//       await raycastingCircuit.calculateWitness(input);
//       assert.fail("The test should have thrown an error");
//     } catch (err) {
//       assert(err.message.includes("Assert Failed"));
//     }
//   });

//   it("Should fail for coordinates outside the circuit's range", async function () {
//     let input = {
//       point: [1000000000000000000000000, 2],
//       polygon: [
//         [0, 0],
//         [4, 0],
//         [4, 4],
//         [0, 4],
//         [0, 0]
//       ]
//     };
//     try {
//       await raycastingCircuit.calculateWitness(input);
//       assert.fail("The test should have thrown an error");
//     } catch (err) {
//         // console.log(err);
//         assert(err.message.includes("Assert Failed"));
//     }
//   });
// });


// test V2
const { assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;
const path = require("path");

describe("RayCasting circuit", function () {
  let raycasting2Circuit;

  before(async function () {
    // Aumentar el tiempo de espera si el circuito es complejo
    this.timeout(10000);

    // Obtener la ruta absoluta del directorio actual
    const currentDir = __dirname;
    console.log("Current directory:", currentDir);

    // Construir la ruta al archivo Circom
    const circomPath = path.join(currentDir, "..", "ProofLocation", "RayCasting.circom");
    console.log("Circom file path:", circomPath);

    try {
      raycasting2Circuit = await wasm_tester(circomPath);
      console.log("Circuit compiled successfully");
    } catch (error) {
      console.error("Error compiling circuit:", error);
      throw error;
    }
  });

  it("Should generate the witness successfully for a point inside the polygon", async function () {
    let input = {
      n: 6,
      point: [2, 2],
      polygon: [
        [1, 1],
        [5, 1],
        [5, 5],
        [3, 5],
        [3, 3],
        [1, 3],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ]
    };
    
    try {
      const witness = await raycasting2Circuit.calculateWitness(input);
      console.log("Witness calculated successfully");
      await raycasting2Circuit.assertOut(witness, {isInside: 1});
      console.log("witness: ", witness);
      console.log("Assertion passed");
    } catch (error) {
      console.error("Error in test:", error);
      throw error;
    }
  });

  it("Should generate the witness successfully for a point outside the polygon", async function () {
    let input = {
      n: 6,
      point: [6, 6],
      polygon: [
        [1, 1],
        [5, 1],
        [5, 5],
        [3, 5],
        [3, 3],
        [1, 3],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ]
    };
    
    try {
      const witness = await raycasting2Circuit.calculateWitness(input);
      console.log("Witness calculated successfully");
      await raycasting2Circuit.assertOut(witness, {isInside: 0});
      console.log("witness: ", witness);
      console.log("Assertion passed");
    } catch (error) {
      console.error("Error in test:", error);
      throw error;
    }
  });

  it("Should generate the witness successfully for a point on the polygon edge", async function () {
    let input = {
      n: 6,
      // point: [3, 3],
      point: [3, 3],
      polygon: [
        [1, 1],
        [5, 1],
        [5, 5],
        [3, 5],
        [3, 3],
        [1, 3],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ]
    };
    
    try {
      const witness = await raycasting2Circuit.calculateWitness(input);
      console.log("Witness calculated successfully");
      await raycasting2Circuit.assertOut(witness, {isInside: 1});
      console.log("witness: ", witness);
      console.log("Assertion passed");
    } catch (error) {
      console.error("Error in test:", error);
      throw error;
    }
  });

  it("Should handle a polygon with less than max vertices", async function () {
    let input = {
      n: 4,
      point: [2, 2],
      polygon: [
        [1, 1],
        [3, 1],
        [3, 3],
        [1, 3],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ]
    };
    
    try {
      const witness = await raycasting2Circuit.calculateWitness(input);
      console.log("Witness calculated successfully");
      await raycasting2Circuit.assertOut(witness, {isInside: 1});
      console.log("witness: ", witness);
      console.log("Assertion passed");
    } catch (error) {
      console.error("Error in test:", error);
      throw error;
    }
  });

  it("Should fail for coordinates outside the circuit's range", async function () {
    let input = {
      n: 6,
      point: [1n << 253n, 2], // Un número muy grande, fuera del rango de 253 bits
      polygon: [
        [1, 1],
        [5, 1],
        [5, 5],
        [3, 5],
        [3, 3],
        [1, 3],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ]
    };
    
    try {
      await raycasting2Circuit.calculateWitness(input);
      // Si llegamos aquí, la prueba debería fallar porque esperamos que se lance un error
      assert.fail("The circuit should have thrown an error for out-of-range coordinates");
    } catch (error) {
      // Esperamos que se lance un error, así que este bloque catch es el comportamiento deseado
      console.log("Circuit correctly failed for out-of-range coordinates");
      assert(error.message.includes("Assert Failed"), "The error should be about assertion failure");
    }
  });
});


