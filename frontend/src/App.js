import React, { useEffect, useState } from "react";
import { getContract } from "./utils/contract";
import { ethers } from "ethers";

export default function App() {
  const [stock, setStock] = useState(0);
  const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    refreshStock();
  }, []);

  async function refreshStock() {
    const contract = getContract();
    setStock((await contract.stock()).toString());
  }

  async function buy() {
    try {
      const contract = getContract();
      const tx = await contract.buy(amount, {
        value: ethers.parseEther((0.01 * amount).toString())
      });
      setStatus("Ждём подтверждения…");
      await tx.wait();
      setStatus("Покупка успешно выполнена! " + tx.hash);
      refreshStock();
    } catch (e) {
      setStatus("Ошибка: " + e.message);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Крипто-вендинг: Кириешки</h1>
      <p>В наличии: {stock} пачек</p>
      <label>
        Сколько купить:
        <input
          type="number"
          min="1"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />
      </label>
      <button onClick={buy} style={{ marginLeft: 10 }}>
        Купить за {(0.01 * amount).toFixed(2)} ETH
      </button>
      <p>{status}</p>
    </div>
  );
}
