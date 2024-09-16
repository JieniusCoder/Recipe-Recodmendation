import { parse } from "path";
import React, { useState } from "react";

interface ReceiptItem {
  name: string;
}

interface RecipeProps {
  label: string;
  image: string;
  url: string;
  calories: number;
}

const Recipe: React.FC<RecipeProps> = ({ label, image, url, calories }) => {
  return (
    <div>
      <h3>{label}</h3>
      <img src={image} alt={label} style={{ width: "100px" }} />
      <br />
      <a href={url} target="_blank" rel="noopener noreferrer">
        LINK
      </a>
      <p>Calories: {calories}</p>
    </div>
  );
};

//Edaman ID: c24b1df0
//Aplication keys: e47b0bcd58dcee39537ee987dfeea200
const Reports: React.FC = () => {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [name, setName] = useState<string>("");
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);

  //user recipe selection
  const [isMaxCaloriesChecked, setIsMaxCaloriesChecked] =
    useState<boolean>(false);
  const [isDietChecked, setIsDietChecked] = useState<boolean>(false);

  const [diet, setDiet] = useState<string[]>([]);
  const [maxCalories, setMaxCalories] = useState<number | "">("");

  const dietRestrictions = [
    "balanced",
    "high-protein",
    "low-fat",
    "low-carb",
    "vegan",
    "vegetarian",
    "sugar-conscious",
    "peanut-free",
    "tree-nut-free",
    "alcohol-free",
    "gluten-free",
  ];

  //Edaman Crendentials
  const APP_ID = "c24b1df0";
  const APP_KEY = "e47b0bcd58dcee39537ee987dfeea200";

  const getRecipes = async () => {
    //adjust API calls for diet, health, and max calories

    // construct the API URL with the items names
    const API_URL = `https://api.edamam.com/api/recipes/v2?type=any&q=
    ${items
      .map((item) => item.name)
      .join("%20")}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const response = await fetch(API_URL);

    const data = await response.json();

    console.log("data hits");
    console.log(data.hits);

    const recipeHits = data.hits.map((hit: any) => {
      return {
        label: hit.recipe.label,
        image: hit.recipe.image,
        url: hit.recipe.url,
        calories: hit.recipe.calories,
      };
    });

    console.log("recipeHits");
    console.log(recipeHits);

    setRecipes(recipeHits);

    console.log("recipes2");
    console.log(recipes.map((recipe) => recipe.label));
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

  //diet
  const handleDietCheckBox = () => {
    setIsDietChecked(!isDietChecked);
  };

  const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    // add new to the old selected diet restrictions
    setDiet(selectedOptions);
  };

  //calories
  const handleCaloriesCheckBox = () => {
    setIsMaxCaloriesChecked(!isMaxCaloriesChecked);
  };

  const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxCalories(parseInt(e.target.value));
  };

  return (
    <div>
      <h1>Create Recipe</h1>

      {/* add item form */}
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

      {/* user recipe selection */}
      {/* Max Calories */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={isMaxCaloriesChecked}
            onChange={handleCaloriesCheckBox}
          />
          Max Calories
        </label>

        {isMaxCaloriesChecked && (
          <div>
            <label>
              Enter Max Calories:
              <input
                type="number"
                value={maxCalories}
                onChange={handleCaloriesChange}
                placeholder="Enter max calories"
              />
            </label>
          </div>
        )}
      </div>

      {/* diet restriction */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={isDietChecked}
            onChange={handleDietCheckBox}
          />
          Diet Restrictions
        </label>

        {isDietChecked && (
          <div>
            <select
              multiple value={diet}
              onChange={handleDietChange}
              style={{
                width: "50%",
                padding: "10px",
                fontSize: "16px",
                border: "2px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#fff",
                appearance: "none",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px top 50%",
                backgroundSize: "12px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              {dietRestrictions.map((restriction) => (
                <option key={restriction} value={restriction}>
                  {restriction}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* display selected diet restrictions */}
      <div>
        {diet.length > 0 && (
          <div>
            <h3>Selected Diet Restrictions:</h3>
            <p>
              {diet.map((restriction) => (
                <li key={restriction}>{restriction}</li>
              ))}
            </p>
          </div>
        )}
      </div>

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
                &times; {/* This is the "x" symbol */}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items added yet.</p>
      )}

      <button onClick={getRecipes}>Refresh Recipes</button>

      <h3>Receipt Suggestion:</h3>
      <div className="recipes">
        {items.length > 0 ? (
          recipes.map((recipe, index) => (
            <Recipe
              key={index}
              label={recipe.label}
              image={recipe.image}
              url={recipe.url}
              calories={parseInt(recipe.calories.toFixed(0))}
            />
          ))
        ) : (
          <p>No items added yet.</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Reports;
