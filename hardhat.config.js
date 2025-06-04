require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.21",
  paths: {
    sources: "./contract"
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: "https://rpc2.sepolia.org",   // публичный RPC
      accounts: [
        // приватник первого аккаунта Hardhat – годится ТОЛЬКО для тестов!
        "0x59c6995e998f97a5a00449736f5dc00e10953340"
      ]
    }
  }
};
