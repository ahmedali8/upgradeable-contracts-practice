// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "chugsplash/ChugSplash.sol";
import "contracts/HelloChugSplash.sol";

contract ChugSplashTest is Test {
    // Your upgradeable contract
    HelloChugSplash internal helloChugSplash;

    function setUp() public {
        // Create a ChugSplash instance
        ChugSplash chugsplash = new ChugSplash();

        // Define the path from the project root to your ChugSplash file.
        string memory chugsplashFilePath = "./chugsplash/hello-chugsplash.json";

        // Deploy all contracts in your ChugSplash file (in this case, just HelloChugSplash.sol)
        chugsplash.deploy(chugsplashFilePath, true);

        // You *must* refresh EVM state after calling `chugsplash.deploy`.
        chugsplash.refresh();

        // Connect to the deployed contract
        helloChugSplash = HelloChugSplash(
            chugsplash.getAddress(chugsplashFilePath, "HelloChugSplash")
        );
    }

    function testNumber() public {
        assertEq(helloChugSplash.number(), 1);
    }

    function testStored() public {
        assertEq(helloChugSplash.stored(), true);
    }

    function testStorageName() public {
        assertEq(helloChugSplash.storageName(), "First");
    }

    function testOtherStorage() public {
        assertEq(helloChugSplash.otherStorage(), 0x1111111111111111111111111111111111111111);
    }
}
