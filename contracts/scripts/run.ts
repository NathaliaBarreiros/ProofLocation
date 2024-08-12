import { ethers } from "hardhat";
import { BigNumberish } from "ethers";

const main = async () => {
    const RayCastingVerifier = await ethers.getContractFactory("RayCastingVerifier");
    const rayCastingVerifier = await RayCastingVerifier.deploy();
    await rayCastingVerifier.waitForDeployment();
    // console.log("RayCastingVerifier Contract deployed to:", rayCastingVerifier.getAddress());
    const deployedAddress = await rayCastingVerifier.getAddress(); // Espera a que se resuelva la promesa
    console.log("RayCastingVerifier Contract deployed to:", deployedAddress);

    let calldataRaycasting = [
        [
            "0x0de1fd18ae0beb0495f0963f576f0c4e2de71b94289effdd1e497a386a0cd46b", "0x2afb80d083228ca7549cb47c6280ad554467a1186a7997ed4e76922db63d6a38"

        ],[
            ["0x0d701faee66896f95abab64dcac0062802cb8822b20debbbf68facc736587779", "0x007b1270a80d80e40e777f93c47c9d43c7252f0d101911fb402ccbf11f3b0505"],["0x10f88264e1b95a2fb66509870e8a66895ba12b88e70097e874ea2f3c75c19897", "0x196e73749514074ab5d7808322b1489c3d6d95cc931ec4becefb110e6a3a7d18"]
        ],[
            "0x2834b62fe2d1c5c552b11975c8b5a0bc498ca4ff4135d67ffe14626e9033f268", "0x2ad9a6c0ac3a232a92e1da8ef1ea1a86865a3c85b3aef236b2606f0b1c293f1b"
        ],[
            "0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000004","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000005","0x0000000000000000000000000000000000000000000000000000000000000003","0x0000000000000000000000000000000000000000000000000000000000000004","0x0000000000000000000000000000000000000000000000000000000000000005","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000005"
        ]
    ];

    // Call the function.
    // let result = await rayCastingVerifier.verifyProof(
    //     calldataRaycasting[0],
    //     calldataRaycasting[1],
    //     calldataRaycasting[2],
    //     calldataRaycasting[3]
    // );

    // console.log("Result", result);
    // Asegurarse de que cada parte de calldataRaycasting esté en el formato correcto
    let _pA: [BigNumberish, BigNumberish] = [calldataRaycasting[0][0], calldataRaycasting[0][1]] as [BigNumberish, BigNumberish];
    let _pB: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]] = [
        [calldataRaycasting[1][0][0], calldataRaycasting[1][0][1]],
        [calldataRaycasting[1][1][0], calldataRaycasting[1][1][1]]
    ] as [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]];
    let _pC: [BigNumberish, BigNumberish] = [calldataRaycasting[2][0], calldataRaycasting[2][1]] as [BigNumberish, BigNumberish];
    let _pubSignals: BigNumberish[] = calldataRaycasting[3] as BigNumberish[];

    // Llamar a verifyProof con los tipos correctos
    try {
        let result = await rayCastingVerifier.verifyProof(_pA, _pB, _pC, _pubSignals);
        console.log("Verificación completada:", result);
    } catch (error) {
        console.error("Error durante la verificación:", error);
    }
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
