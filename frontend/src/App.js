import React, { useEffect, useState } from "react";
import "./App.css";

function ProductCard({ product, onBuy }) {
  const [amount, setAmount] = useState(1);
  return (
    <div className="card">
      <h2>{product.name}</h2>
      <p>В наличии: {product.stock}</p>
      <div className="controls">
        <input
          type="number"
          min="1"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />
        <button onClick={() => onBuy(product.id, amount)}>
          Купить за {(product.priceEth * amount).toFixed(2)} ETH
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    refreshProducts();
  }, []);

  async function refreshProducts() {
    try {
      const res = await fetch("http://localhost:4000/products");
      const items = await res.json();
      setProducts(items);
    } catch (e) {
      setStatus("Ошибка загрузки: " + e.message);
    }
  }

  async function buy(productId, amount) {
    try {
      const res = await fetch("http://localhost:4000/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, amount })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      const data = await res.json();
      setStatus("Покупка успешно выполнена! " + data.txHash);
      refreshProducts();
    } catch (e) {
      setStatus("Ошибка: " + e.message);
    }
  }

  return (
    <div className="container">
      <h1>Крипто-вендинг</h1>
      <div className="products">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onBuy={buy} />
        ))}
      </div>
      <p className="status">{status}</p>
    </div>
  );
}
