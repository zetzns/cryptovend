# CryptoVend

Demo dApp that sells a pack of snacks via Ethereum smart contract.

## Requirements
* Node.js 18+
* [MetaMask](https://metamask.io/) browser extension

## Setup

1. Install dependencies:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

2. In a separate terminal start a local Hardhat node:

```bash
npx hardhat node
```

3. Deploy the contract to the local network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

4. Run the backend API:

```bash
cd backend
npm start
```

5. Run the React frontend:

```bash
cd ../frontend
npm start
```

Open `http://localhost:3000` in the browser.

## Connecting MetaMask

Add a custom network in MetaMask with the following parameters:

- **Network name**: Hardhat Local
- **RPC URL**: `http://127.0.0.1:8545`
- **Chain ID**: `31337`

After that load the page and click **"Connect MetaMask"** to authorize the DApp.
