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

// локальные запасы трёх товаров
const products = [
  { id: 1, name: "Сухарики Кириешки", priceEth: 0.01, stock: 100 },
  { id: 2, name: "Липтон чёрный", priceEth: 0.01, stock: 100 },
  { id: 3, name: "Сухарики 3 Корочки", priceEth: 0.01, stock: 100 }
];

// список товаров
app.get("/products", async (_, res) => {
  res.json(products);
});

// покупка через backend без использования браузерного кошелька
app.post("/buy", async (req, res) => {
  const { productId, amount } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(400).json({ error: "Invalid product" });
  }
  if (amount <= 0 || product.stock < amount) {
    return res.status(400).json({ error: "Not enough stock" });
  }
  try {
    const tx = await contract.buy(amount, {
      value: ethers.parseEther((product.priceEth * amount).toString())
    });
    await tx.wait();
    product.stock -= amount;
    res.json({ txHash: tx.hash });
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});

app.listen(4000, () => console.log("Backend API http://localhost:4000"));
