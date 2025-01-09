const fetch = require('node-fetch');
const fs = require('fs');

async function main() {
  // Read contract address from file
  const contractAddressFile = fs.readFileSync('contract-address.txt', 'utf8');
  const contractAddress = contractAddressFile.split('\n')[0].split(': ')[1];
  const [deployer] = await ethers.getSigners();
  
  console.log("Verifying contract at address:", contractAddress);
  
  try {
    // Read flattened source code
    const sourceCode = fs.readFileSync('./contracts/CoDASToken.flattened.sol', 'utf8');
    
    // Prepare verification data
    const verificationData = {
      module: "contract",
      action: "verify",
      addressHash: contractAddress,
      name: "CoDASToken",
      contractSourceCode: sourceCode,
      compilerVersion: "v0.8.20+commit.a1b79de6",
      optimization: true,
      optimizationRuns: 200,
      constructorArguments: deployer.address,
      evmVersion: "paris",
      licenseType: 3 // MIT License
    };

    console.log("Sending verification request...");
    
    const response = await fetch("https://evmapi.confluxscan.io/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(verificationData)
    });

    if (!response.ok) {
      const text = await response.text();
      console.log("Complete response:", text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Verification result:", result);
    
    if (result.status === "1") {
      console.log("Verification successful!");
    } else {
      console.log("Verification failed:", result.message);
    }
    
  } catch (error) {
    console.error("Error during verification:", error);
    if (error.response) {
      console.error("Response details:", await error.response.text());
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 