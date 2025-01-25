import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState(''); // For the user's search input
  const [recipes, setRecipes] = useState([]); // To store recipe results

  const fetchRecipes = () => {
    const APP_ID = 'cd40fbf9'; // Replace with your App ID
    const APP_KEY = '55ac34301337b8fb33eac2b9ec6cd4fd'; // Replace with your App Key
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

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
      <button onClick={fetchRecipes} style={{ padding: '5px 10px', fontSize: '16px' }}>
        Search
      </button>
      <div style={{ marginTop: '20px' }}>
        {recipes.map((recipe, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{recipe.recipe.label}</h3>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} style={{ width: '200px' }} />
            <p>
              <strong>Ingredients:</strong> {recipe.recipe.ingredientLines.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


