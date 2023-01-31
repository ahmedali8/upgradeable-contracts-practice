import { expect } from "chai";
import type { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

// Start test block
describe("Box (proxy)", function () {
  let Box;
  let box: Contract;

  beforeEach(async function () {
    Box = await ethers.getContractFactory("Box");
    box = await upgrades.deployProxy(Box, [42], { initializer: "store" });
  });

  // Test case
  it("retrieve returns a value previously initialized", async function () {
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await box.retrieve()).toString()).to.equal("42");
  });
});
