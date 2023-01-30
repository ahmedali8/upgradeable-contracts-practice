import { deployments, ethers } from "hardhat";

async function main() {
  const { log } = deployments;

  log("----------------------------------------------------");

  const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin");
  const transparentProxy = await ethers.getContract("Box_Proxy");

  const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address);
  const version1 = await proxyBoxV1.version();
  console.log(version1.toString());

  // Upgrade!
  // Not "the hardhat-deploy way"
  const boxV2 = await ethers.getContract("BoxV2");
  const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address);
  await upgradeTx.wait(1);

  const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address);
  const version = await proxyBoxV2.version();
  console.log(version.toString());

  log("----------------------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
