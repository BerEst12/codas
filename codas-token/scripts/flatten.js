const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function main() {
  try {
    // Execute hardhat flatten
    const output = execSync('npx hardhat flatten contracts/CoDASToken.sol').toString();
    
    // Remove duplicate SPDX licenses
    const cleanedOutput = output.replace(/\/\/ SPDX-License-Identifier: MIT\n/g, '');
    const finalOutput = '// SPDX-License-Identifier: MIT\n' + cleanedOutput;
    
    // Save result
    fs.writeFileSync(
      path.join(__dirname, '../contracts/CoDASToken.flattened.sol'),
      finalOutput
    );
    
    console.log('Flattened contract saved to contracts/CoDASToken.flattened.sol');
  } catch (error) {
    console.error('Error flattening contract:', error);
    process.exit(1);
  }
}

main(); 