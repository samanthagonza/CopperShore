// src/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css'; // Add optional CSS for styling

function SearchBar({ placeholder, onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Trigger search callback
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
