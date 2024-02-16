import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
        try {
            const backend_response = await fetch('/clubs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
              // body: JSON.stringify({ clubName, clubType }),
            });
            if(backend_response.ok){
              console.log("Server recieved our request to query the database.");
            }
            const backendStatus = await backend_response.json();
            if(backendStatus.success){
              // console.log("Server responded with a success!");
              // success respond means that we have the array
              setClubs(backendStatus.posts);
              console.log("displaying clubs...");
            }
        } catch (error) {
            console.error('Error fetching clubs: ', error);
        }
    };
    
    fetchClubs();
  }, []);
  
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  const filteredClubs = clubs.filter(item =>
    item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.type.toLowerCase().includes(searchInput.toLowerCase())
  );
  
  return (
    <div>
      <div>
        <input
          type="search"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}
        />
      </div>
      <div>
        <table>
          <tr>
            <th>Club Name</th>
            <th>Club Type</th>
          </tr>
          {filteredClubs.map((club) => (
            <tr key={club.name}>
              <td>{club.name}</td>
              <td>{club.type}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default SearchBar;