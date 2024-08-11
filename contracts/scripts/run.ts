import { ethers } from "hardhat";
import { BigNumberish } from "ethers";

const main = async () => {

    const RayCastingVerifier = await ethers.getContractFactory("RayCastingVerifier");
    const rayCastingVerifier = await RayCastingVerifier.deploy();
    await rayCastingVerifier.waitForDeployment();
    // console.log("RayCastingVerifier Contract deployed to:", rayCastingVerifier.getAddress());
    const deployedAddress = await rayCastingVerifier.getAddress(); // Espera a que se resuelva la promesa
    console.log("RayCastingVerifier Contract deployed to:", deployedAddress);

    let calldataRaycasting : (string[] | string[][])[] = [
        // change value for this proof, to get FALSE
        [
            "0x21d1a7ba7fc113d01dcc70096c2a5df7066c1c9c5b4c18ef993c5c9d7c51ebff", "0x1c3d88d4b594e06b27661e1451d59a92e16478350225d8acbf63b650d9a63788"
        ],
        // original value for this proof, get TRUE
        // [
        //     "0x21d1a7ba7fc113d01dcc70096c2a5df7066c1c9c5b4c18ef993c5c9d7c51ebff", "0x1c3d88d4b594e06b27661e1451d59a92e16478350225d8acbf63b650d9a63707"
        // ],
        [
            [
                "0x1fcc73f4ba3166e3a917210606508b5edd1c9e562d60d6f6e4459769329e0484", "0x00dbde69bd04883754978b62e58d61370413125fdb304d0c25b5b5eb2b9257c0"
            ],
            [
                "0x212c484ecd4632f77424121c2ff7bfa2f5ddffc85c377e9799964facbc7bd142", "0x0cbec91156e2b6373bd5b02435568ab536c19cc0dfc82a6565a90d9696c5cb76"
            ]
        ],[
            "0x143d8ace9943501fa704f9799914a7a0b7d2ca74196849d5294c8a05d54f8bfc", "0x1b7ac8f5e193c9719e7e02105ea074e01a4ded7d6cd5f5777ca931cda733e012"
        ],[
            "0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000006","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000005","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000005","0x0000000000000000000000000000000000000000000000000000000000000005","0x0000000000000000000000000000000000000000000000000000000000000003","0x0000000000000000000000000000000000000000000000000000000000000005","0x0000000000000000000000000000000000000000000000000000000000000003","0x0000000000000000000000000000000000000000000000000000000000000003","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000003","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000000"
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
