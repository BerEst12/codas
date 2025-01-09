// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoDASToken is ERC20, Ownable {
    uint256 public maxSupply = 10000000 * 10 ** decimals(); // 10 million max
    uint256 public maxTxAmount;
    mapping(address => bool) public isExcludedFromLimit;
    mapping(address => uint256) public lockedUntil;
    
    constructor(address initialOwner) 
        ERC20("CoDAS Token", "CODAS") 
        Ownable(initialOwner)
    {
        isExcludedFromLimit[msg.sender] = true;
        _mint(msg.sender, 1000000 * 10 ** decimals());
        maxTxAmount = totalSupply() / 100; // 1% of total supply
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Exceeds maximum supply");
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    function setMaxTxAmount(uint256 amount) public onlyOwner {
        maxTxAmount = amount;
    }
    
    function excludeFromLimit(address account, bool excluded) public onlyOwner {
        isExcludedFromLimit[account] = excluded;
    }
    
    function lockTokens(address account, uint256 unlockTime) public onlyOwner {
        require(unlockTime > block.timestamp, "Invalid unlock time");
        lockedUntil[account] = unlockTime;
    }
    
    function _update(address from, address to, uint256 amount)
        internal
        virtual
        override
    {
        if (from != address(0)) { // Skip checks for minting
            require(block.timestamp >= lockedUntil[from], "Tokens are locked");
            if (!isExcludedFromLimit[from] && !isExcludedFromLimit[to]) {
                require(amount <= maxTxAmount, "Transfer exceeds maximum limit");
            }
        }
        super._update(from, to, amount);
    }
} 