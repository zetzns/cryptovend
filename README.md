# CryptoVend

Demo dApp that sells a pack of snacks via Ethereum smart contract.

## Requirements
* Node.js 18+

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

The frontend communicates with the backend API, which signs and sends
transactions using a default Hardhat account. No browser wallet is required.

