import { ethers, network, run, upgrades } from "hardhat";

async function main() {
  const Box = await ethers.getContractFactory("Box");
  console.log("Deploying Box, ProxyAdmin, and then Proxy...");
  const proxy = await upgrades.deployProxy(Box, [42], { initializer: "store" });
  await proxy.deployed();
  console.log("Proxy of Box deployed to:", proxy.address);

  const chainId = network.config.chainId;

  // You don't want to verify on localhost
  if (chainId && chainId !== 31337 && chainId !== 1337) {
    await run("verify:verify", {
      address: proxy.address,
      constructorArguments: [],
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
