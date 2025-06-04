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
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
      ]
    }
  }
};
