import React, { useEffect, useState } from "react";

export default function App() {
  const [stock, setStock] = useState(0);
  const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    refreshStock();
  }, []);

  async function refreshStock() {
    try {
      const res = await fetch("http://localhost:4000/products");
      const products = await res.json();
      setStock(products[0].stock);
    } catch (e) {
      setStatus("Ошибка загрузки: " + e.message);
    }
  }

  async function buy() {
    try {
      const res = await fetch("http://localhost:4000/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      const data = await res.json();
      setStatus("Покупка успешно выполнена! " + data.txHash);
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
