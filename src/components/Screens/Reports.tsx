import React, { useState } from "react";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

const Reports:React.FC = () => {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ReceiptItem = { name, quantity, price };
    setItems([...items, newItem]);
    setName("");
    setQuantity(1);
    setPrice(0);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div>
      <h1>Create Receipt</h1>

      <form onSubmit={addItem}>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>

      <h3>Receipt Suggestion:</h3>
      {items.length > 0 ? (
        <div>
          <ul>
            {items.map((item, index) => (
              <p key={index}>
                {item.quantity} x {item.name} @ ${item.price.toFixed(2)} each = $
                {(item.price * item.quantity).toFixed(2)}
              </p>
            ))}
          </ul>
          <p>Total: ${calculateTotal().toFixed(2)}</p>
        </div>
      ) : (
        <p>No items added yet.</p>
      )}
    </div>
  );
}

export default Reports;