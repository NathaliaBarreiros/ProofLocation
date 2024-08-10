import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RayCastingModule = buildModule("RayCastingModule", (m) => {
  const raycasting = m.contract("RayCastingVerifier");

  return { raycasting };
});

export default RayCastingModule;
