# CoDAS Token (CODAS)

CoDAS Token is an ERC-20 token deployed on the Conflux eSpace network. It implements advanced security and control features.

## Contract Information
- **Network**: Conflux eSpace (Chain ID: 1030)
- **Contract Address**: 0xe8dc3c1F20017bcce8E52E894BBac7476478521E
- **Explorer**: [Conflux eSpace Explorer](https://evm.confluxscan.io)

## Features

- **Name**: CoDAS Token
- **Symbol**: CODAS
- **Decimals**: 18
- **Maximum Supply**: 10,000,000 CODAS
- **Initial Supply**: 1,000,000 CODAS

### Special Features

1. **Transaction Control**
   - Maximum transaction limit (1% of total supply)
   - Transaction limit exclusion list
   - Token locking system

2. **Administrative Functions**
   - Owner-controlled minting
   - Token burning by any holder
   - Ownership control through Ownable
   - Ability to exclude addresses from transaction limit
   - Token temporal locking system

## Project Setup

### Prerequisites
- Node.js v14+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile
```

### Deployment
```bash
# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Deploy to Conflux eSpace
npx hardhat run scripts/deploy.js --network conflux_espace
```

### Verification
```bash
# Flatten contract
node scripts/flatten.js

# Verify on explorer
npm run verify
```

## Project Structure
```
├── contracts/
│   ├── CoDASToken.sol              # Main contract
│   └── CoDASToken.flattened.sol    # Flattened contract for verification
├── scripts/
│   ├── deploy.js                   # Deployment script
│   ├── verify.js                   # Verification script
│   └── flatten.js                  # Contract flattening script
├── hardhat.config.js               # Hardhat configuration
└── .env                            # Environment variables
```

## Security

The contract includes several security features:
- Transaction limits to prevent market manipulation
- Time-lock system for vesting
- Role-based access control
- Protection against overflow/underflow through SafeMath (included in Solidity 0.8+)

## Conflux eSpace Network

- **Network Name**: Conflux eSpace
- **Chain ID**: 1030
- **RPC URL**: https://evm.confluxrpc.com
- **Explorer**: https://evm.confluxscan.io

## License

This project is under the MIT License.
