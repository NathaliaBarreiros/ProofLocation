import { ethers } from "hardhat";
import { BigNumberish } from "ethers";

const main = async () => {
    const RayCastingVerifier = await ethers.getContractFactory("RayCastingVerifier");
    const rayCastingVerifier = await RayCastingVerifier.deploy();
    await rayCastingVerifier.waitForDeployment();
    // console.log("RayCastingVerifier Contract deployed to:", rayCastingVerifier.getAddress());
    const deployedAddress = await rayCastingVerifier.getAddress(); // Espera a que se resuelva la promesa
    console.log("RayCastingVerifier Contract deployed to:", deployedAddress);
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