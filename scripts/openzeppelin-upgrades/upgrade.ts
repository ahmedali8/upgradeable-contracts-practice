import { ethers, upgrades } from "hardhat";

async function main() {
  const proxyAddress = "FILL_ME_IN";
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  const box = await upgrades.upgradeProxy(proxyAddress, BoxV2);
  console.log("Your upgraded proxy is done!", box.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
