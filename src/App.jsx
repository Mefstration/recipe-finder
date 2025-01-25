import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState(''); // For the user's search input
  const [diet, setDiet] = useState(''); // For the dietary filter
  const [recipes, setRecipes] = useState([]); // To store recipe results

  const fetchRecipes = () => {
    const APP_ID = 'cd40fbf9'; // Replace with your App ID
    const APP_KEY = '55ac34301337b8fb33eac2b9ec6cd4fd'; // Replace with your App Key
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}${
      diet ? `&health=${diet}` : ''
    }`;

    axios
      .get(url)
      .then(response => setRecipes(response.data.hits)) // Save recipes in state
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Enter ingredients (e.g., chicken, rice)"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
      />
      <select
        value={diet}
        onChange={e => setDiet(e.target.value)}
        style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
      >
        <option value="">No Filter</option>
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="dairy-free">Dairy-Free</option>
        <option value="keto">Keto</option>
      </select>
      <button onClick={fetchRecipes} style={{ padding: '5px 10px', fontSize: '16px' }}>
        Search
      </button>
      <div style={{ marginTop: '20px' }}>
  {recipes.map((recipe, index) => (
    <div
      key={index}
      style={{
        marginBottom: '20px',
        border: '1px solid #ccc',
        padding: '15px',
        borderRadius: '10px',
      }}
    >
      <h3>{recipe.recipe.label}</h3>
      <img
        src={recipe.recipe.image}
        alt={recipe.recipe.label}
        style={{ width: '200px', marginBottom: '10px' }}
      />
      
      <p><strong>Ingredients:</strong></p>
      <ol>
        {recipe.recipe.ingredientLines.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        ))}
      </ol>

      <p><strong>Instructions:</strong></p>
      <p>
        Follow these step-by-step instructions at:{" "}
        <a
          href={recipe.recipe.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Full Recipe Instructions
        </a>
      </p>
    </div>
  ))}
</div>

    </div>
  );
}

export default App;



