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

  await preDeploy({ signerAddress: deployer, contractName: "Box" });
  const boxDeployment = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    // waitConfirmations: waitBlockConfirmations,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: {
        name: "BoxProxyAdmin",
        artifact: "BoxProxyAdmin",
      },
    },
  });

  // You don't want to verify on localhost
  if (chainId !== "31337" && chainId !== "1337") {
    log("Verifying...");

    const contractPath = `contracts/Box.sol:Box`;
    await verifyContract({
      contractPath: contractPath,
      contractAddress: boxDeployment.address,
      args: boxDeployment.args || [],
    });
  }

  log("----------------------------------------------------");
};

export default func;
func.tags = ["Box"];
