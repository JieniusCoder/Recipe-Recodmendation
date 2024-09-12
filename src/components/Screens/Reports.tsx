import React, { useState } from "react";

interface ReceiptItem {
  name: string;
}

//Edaman ID: c24b1df0
//Aplication keys: e47b0bcd58dcee39537ee987dfeea200

const Reports: React.FC = () => {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [name, setName] = useState<string>("");

  //Edaman Crendentials
  const APP_ID = "c24b1df0";
  const APP_KEY = "e47b0bcd58dcee39537ee987dfeea200";

  const getRecipes = async () => {
    // construct the API URL with the items names
    const API_URL = `https://api.edamam.com/api/recipes/v2?type=any&q=${items.join(
      ","
    )}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const response = await fetch(API_URL);

    const data = await response.json();
    console.log(data);
  };

  const addItem = (e: React.FormEvent) => {
    // check if item is already in the list
    if (items.find((item) => item.name === name)) {
      alert("Item already in the list");
    } else {
      e.preventDefault();
      const newItem: ReceiptItem = { name };
      setItems([...items, newItem]);
      setName("");
    }
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <h1>Create Recipe</h1>

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
        <button type="submit">Add Item</button>
      </form>

      {/* display all items */}
      <h3>Items:</h3>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name}
              <button
                onClick={() => removeItem(index)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                &times;  {/* This is the "x" symbol */}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items added yet.</p>
      )}

      <button onClick={getRecipes}>Get Recipes</button>

      {/* display the recipe */}

      <h3>Receipt Suggestion:</h3>
      {items.length > 0 ? (
        <div>{/* add the recipe here*/}</div>
      ) : (
        <p>No items added yet.</p>
      )}
      <hr />
    </div>
  );
};

export default Reports;
