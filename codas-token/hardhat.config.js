require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    conflux_espace: {
      url: "https://evm.confluxrpc.com",
      chainId: 1030,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      conflux_espace: "no-api-key-needed"
    },
    customChains: [
      {
        network: "conflux_espace",
        chainId: 1030,
        urls: {
          apiURL: "https://evmapi.confluxscan.io/api",
          browserURL: "https://evm.confluxscan.io",
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
}; 