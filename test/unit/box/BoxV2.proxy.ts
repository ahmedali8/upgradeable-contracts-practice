import { expect } from "chai";
import type { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

// Start test block
describe("BoxV2 (proxy)", function () {
  let Box;
  let BoxV2;
  let box: Contract;
  let boxV2: Contract;

  beforeEach(async function () {
    Box = await ethers.getContractFactory("Box");
    BoxV2 = await ethers.getContractFactory("BoxV2");

    box = await upgrades.deployProxy(Box, [42], { initializer: "store" });
    boxV2 = await upgrades.upgradeProxy(box.address, BoxV2);
  });

  // Test case
  it("retrieve returns a value previously incremented", async function () {
    // Increment
    await boxV2.increment();

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await boxV2.retrieve()).toString()).to.equal("43");
  });
});
