import React, { useState } from 'react';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  
  const countries = [
    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" }
  ];
  
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  const filteredCountries = countries.filter(item =>
    item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.continent.toLowerCase().includes(searchInput.toLowerCase())
  );
  
  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <table>
        <tr>
          <th>Country</th>
          <th>Continent</th>
        </tr>
        {filteredCountries.map((country) => (
          <tr key={country.name}>
            <td>{country.name}</td>
            <td>{country.continent}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default SearchBar;