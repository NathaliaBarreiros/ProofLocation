// const { assert } = require("chai");
// const wasm_tester = require("circom_tester").wasm;

import { assert } from 'chai';
import { wasm as wasm_tester } from 'circom_tester';

describe("RayCasting circuit", function () {
  let raycastingCircuit;

  before(async function () {
    raycastingCircuit = await wasm_tester("ProofLocation/RayCasting.circom");
  });

  it("Should generate the witness successfully for a point inside the polygon", async function () {
    let input = {
      point: [2, 2],
      polygon: [
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4],
        [0, 0]
      ]
    };
    const witness = await raycastingCircuit.calculateWitness(input);
    await raycastingCircuit.assertOut(witness, {isInside: 1});
  });

  it("Should generate the witness successfully for a point outside the polygon", async function () {
    let input = {
      point: [5, 5],
      polygon: [
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4],
        [0, 0]
      ]
    };
    const witness = await raycastingCircuit.calculateWitness(input);
    await raycastingCircuit.assertOut(witness, {isInside: 0});
  });

  it("Should generate the witness successfully for a point on the polygon edge", async function () {
    let input = {
      point: [0, 2],
      polygon: [
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4],
        [0, 0]
      ]
    };
    const witness = await raycastingCircuit.calculateWitness(input);
    await raycastingCircuit.assertOut(witness, {isInside: 1});
  });

//   it("Should handle a polygon with incorrect number of vertices", async function () {
//     let input = {
//       point: [2, 2],
//       polygon: [
//         [0, 0],
//         [4, 0],
//         [4, 4],
//         [0, 4]
//       ]
//     };
//     const witness = await raycastingCircuit.calculateWitness(input);
//     // Aquí deberíamos verificar el comportamiento esperado.
//     // Por ejemplo, podríamos verificar que isInside es 0 o 1, dependiendo de cómo
//     // queremos que el circuito maneje este caso.
//     await raycastingCircuit.assertOut(witness, {});
//   });


  it("Should fail for a polygon with incorrect number of vertices", async function () {
    let input = {
      point: [2, 2],
      polygon: [
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4]
      ]
    };
    try {
      await raycastingCircuit.calculateWitness(input);
      assert.fail("The test should have thrown an error");
    } catch (err) {
      assert(err.message.includes("Assert Failed"));
    }
  });

  it("Should fail for coordinates outside the circuit's range", async function () {
    let input = {
      point: [1000000000000000000000000, 2],
      polygon: [
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4],
        [0, 0]
      ]
    };
    try {
      await raycastingCircuit.calculateWitness(input);
      assert.fail("The test should have thrown an error");
    } catch (err) {
        // console.log(err);
        assert(err.message.includes("Assert Failed"));
    }
  });
});