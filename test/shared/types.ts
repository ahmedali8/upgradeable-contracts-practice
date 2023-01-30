import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    contracts: Contracts;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Contracts {}

export interface Signers {
  deployer: SignerWithAddress;
  accounts: SignerWithAddress[];
}
