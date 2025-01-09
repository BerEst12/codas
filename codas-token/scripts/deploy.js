async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const CoDASToken = await ethers.getContractFactory("CoDASToken");
  const token = await CoDASToken.deploy(deployer.address);
  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log("CoDAS Token deployed to:", tokenAddress);
  
  // Save address for verification
  const fs = require('fs');
  fs.writeFileSync(
    'contract-address.txt',
    `Token Address: ${tokenAddress}\nDeployer Address: ${deployer.address}`
  );
  
  console.log("Waiting 30 seconds before verification...");
  await new Promise(resolve => setTimeout(resolve, 30000));

  try {
    await hre.run("verify:verify", {
      address: tokenAddress,
      constructorArguments: [deployer.address],
    });
    console.log("Contract verified successfully");
  } catch (error) {
    console.log("Automatic verification failed. Use 'npm run verify' manually later");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 