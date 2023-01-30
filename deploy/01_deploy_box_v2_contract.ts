import type { DeployFunction } from "hardhat-deploy/types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

import { preDeploy } from "../utils/contracts";
import { verifyContract } from "../utils/verify";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, getChainId, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  // const waitBlockConfirmations = chainId !== "31337" && chainId !== "1337" ? undefined : 6;

  log("----------------------------------------------------");

  await preDeploy({ signerAddress: deployer, contractName: "BoxV2" });
  const boxV2Deployment = await deploy("BoxV2", {
    from: deployer,
    args: [],
    log: true,
    // waitConfirmations: waitBlockConfirmations,
  });

  // You don't want to verify on localhost
  if (chainId !== "31337" && chainId !== "1337") {
    log("Verifying...");

    const contractPath = `contracts/BoxV2.sol:BoxV2`;
    await verifyContract({
      contractPath: contractPath,
      contractAddress: boxV2Deployment.address,
      args: boxV2Deployment.args || [],
    });
  }

  log("----------------------------------------------------");
};

export default func;
func.tags = ["BoxV2"];
