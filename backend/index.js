import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { ethers } from "ethers";

const { address } = JSON.parse(readFileSync("../address.json"));
const abi = JSON.parse(
  readFileSync("../artifacts/contracts/VendingMachine.sol/VendingMachine.json")
).abi;

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // локальный Hardhat
const wallet = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // тестовый ключ Hardhat
  provider
);
const contract = new ethers.Contract(address, abi, wallet);

const app = express();
app.use(cors());
app.use(express.json());

// список товаров (пока один)
app.get("/products", async (_, res) => {
  const stock = await contract.stock();
  res.json([
    {
      id: 1,
      name: "Сухарики Кириешки",
      priceEth: "0.01",
      stock: stock.toString()
    }
  ]);
});

// покупка через backend без использования браузерного кошелька
app.post("/buy", async (req, res) => {
  const { amount } = req.body;
  try {
    const tx = await contract.buy(amount, {
      value: ethers.parseEther((0.01 * amount).toString())
    });
    await tx.wait();
    res.json({ txHash: tx.hash });
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});

app.listen(4000, () => console.log("Backend API http://localhost:4000"));
