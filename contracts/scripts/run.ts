import { ethers } from "hardhat";
import { BigNumberish } from "ethers";

const main = async () => {
    const RayCastingVerifier = await ethers.getContractFactory("RayCastingVerifier");
    const rayCastingVerifier = await RayCastingVerifier.deploy();
    await rayCastingVerifier.waitForDeployment();
    // console.log("RayCastingVerifier Contract deployed to:", rayCastingVerifier.address);

    const deployedAddress = await rayCastingVerifier.getAddress(); // Espera a que se resuelva la promesa
    console.log("RayCastingVerifier Contract deployed to:", deployedAddress);

    let calldataRaycasting = [
        //FALSE
        // [
        //     "0x09431c2ba5349bfed5f0dfd1028ba428b1772847c0f96ece285e424062003b12",
        //     "0x1b86cdca21c3ae9de51897dcc3a4b6d7c677a47c6448f9dd46bce1a48bb49755"
        // ],
        //TRUE
        // [
        //     "0x09431c2ba5349bfed5f0dfd1028ba428b1772847c0f96ece285e424062003b12",
        //     "0x1b86cdca21c3ae9de51897dcc3a4b6d7c677a47c6448f9dd46bce1a48bb49793"
        // ],
        // [
        //     [
        //         "0x0ae962b388504684428f41ef4c761180ceed57ca1e7688656f69cace04ee46d9",
        //         "0x12d361a0310983834e4f16fc0b358810de2a906fb84337aa0cc0f07b6d9256b6"
        //     ],
        //     [
        //         "0x05693854ba539fdd317416f84d100b3132fe2e3b91805c2c34fa589394d1cd1d",
        //         "0x147e1f677f1f03addc79afffd6cbcf0e1b1270e2e5bc43f9dacffc77d0455da3"
        //     ]
        // ],
        // [
        //     "0x1f30b1a739201485acddfc8cae8af6a99c497b566d4bf11c70372add37db4917",
        //     "0x218bfc3f053ff07c35a113f4ac976c40517794f246030bf838b2601d47982872"
        // ],
        // [
        //     "0x0000000000000000000000000000000000000000000000000000000000000000",
        //     "0x0000000000000000000000000000000000000000000000000000000000000009",
        //     "0x0000000000000000000000000000000000000000000000000000000000000003",
        //     "0x0000000000000000000000000000000000000000000000000000000000000001",
        //     "0x0000000000000000000000000000000000000000000000000000000000000001",
        //     "0x0000000000000000000000000000000000000000000000000000000000000004",
        //     "0x0000000000000000000000000000000000000000000000000000000000000001",
        //     "0x0000000000000000000000000000000000000000000000000000000000000005",
        //     "0x0000000000000000000000000000000000000000000000000000000000000003",
        //     "0x0000000000000000000000000000000000000000000000000000000000000004",
        //     "0x0000000000000000000000000000000000000000000000000000000000000005",
        //     "0x0000000000000000000000000000000000000000000000000000000000000001",
        //     "0x0000000000000000000000000000000000000000000000000000000000000005"
        // ]
        //true
        // [       "0x0117ab2e19cc9292bfb9d7b83bf1964141018e428c2fe33f6f0cdde348618346", "0x066bd2cf21e9616a7b83bf6ec40bc617c10daafe1383bf53ac19c2437ec7e6b5"
        // ]
        [       "0x0117ab2e19cc9292bfb9d7b83bf1964141018e428c2fe33f6f0cdde348618355", "0x066bd2cf21e9616a7b83bf6ec40bc617c10daafe1383bf53ac19c2437ec7e6b5"
        ],[
            [
                "0x0096efb42174e218b7463727c9ab1ca28ec4750faad734f19801cfb461a3e87d", "0x1acc4f2fc8fbb2111a32d38aa403247189a3a74794459c1fc3b44d9f8e879cb2"
            ],[
                "0x1f925d3247839fbc252b1f6130bae220a7301355054aea5eb44f4cf17c846b84", "0x0c5b6205429af927d967d9cb51da83ba74f020f7f220bde042479ab33a85f5ea"
            ]
        ],[
            "0x1c6d220ea29bfb45019b47a88f2e82b09a230afd284945336073fef0a4d976b0", "0x24e1773fca2cd881c2cb31c41dd917e11b1eb8593144a5539d842244f182e0b2"
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
