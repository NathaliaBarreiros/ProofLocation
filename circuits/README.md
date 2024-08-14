# ZK Location Proof

This folder contains a Circom circuit file and associated scripts for a Zero-Knowledge (ZK) proof system that anonymously validates a user's location within an administrator-defined polygon using the RayCasting algorithm.

## Components

- Circom Circuit: Implements location validation logic using RayCasting algorithm.

- Groth16 Files: Generated files for ZK proof creation and verification.

- Smart Contract: Solidity verifier for on-chain proof validation.

## Setup and Execution

### Running `.sh` Scripts

Changing the files permissions to make it executable

```shell
chmod u+x compile.sh
chmod u+x generateWitness.sh
chmod u+x executeGroth16.sh
```

Run them:

```shell
./compile.sh
./generateWitness.sh
./executeGroth16.sh
```

### Running Tests

```shell
yarn test
```
