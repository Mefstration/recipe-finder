import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState(''); // For the user's search input
  const [diet, setDiet] = useState(''); // For the dietary filter
  const [cuisine, setCuisine] = useState(''); // For Cuisine filters
  const [recipes, setRecipes] = useState([]); // To store recipe results
  const [error, setError] = useState(''); // For API error handling
  const [loading, setLoading] = useState(false); // For the loading state

  const fetchRecipes = async () => {
    if (!query) {
      alert('Please enter an ingredient to search!');
      return;
    }
  
    const APP_ID = 'cd40fbf9'; // Replace with your correct App ID
    const APP_KEY = '55ac34301337b8fb33eac2b9ec6cd4fd'; // Replace with your correct App Key
    const USER_ID = 'your-user-id'; // Replace with the correct Edamam User ID
    const url = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${APP_ID}&app_key=${APP_KEY}${
      diet ? `&health=${diet}` : ''
    }${cuisine ? `&cuisineType=${cuisine}` : ''}`;
  
    try {
      setLoading(true);
      setError('');
      console.log('API Request URL:', url); // Log the API URL for debugging
      const response = await axios.get(url, {
        headers: {
          'Edamam-Account-User': USER_ID, // Add this header
        },
      });
      console.log('API Response:', response.data); // Log the full response
      if (response.data.hits.length === 0) {
        setError('No recipes found. Try searching for something else.');
      } else {
        setRecipes(response.data.hits);
      }
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
      setError('Failed to fetch recipes. Please check your API credentials or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Enter ingredients (e.g., chicken, rice)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
      />
      <select
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
      >
        <option value="">No Filter</option>
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="dairy-free">Dairy-Free</option>
        <option value="keto">Keto</option>
      </select>
      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
      >
        <option value="">No Filter</option>
        <option value="italian">Italian</option>
        <option value="mexican">Mexican</option>
        <option value="indian">Indian</option>
        <option value="chinese">Chinese</option>
        <option value="japanese">Japanese</option>
      </select>

      <button
        onClick={fetchRecipes}
        style={{ padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}
      >
        Search
      </button>

      {loading && <p>Loading recipes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
            <p>
              <strong>Ingredients:</strong>
            </p>
            <ol>
              {recipe.recipe.ingredientLines.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ol>
            <p>
              <strong>Instructions:</strong>
            </p>
            <p>
              Follow these step-by-step instructions at:{' '}
              <a
                href={recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue', textDecoration: 'underline' }}
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
