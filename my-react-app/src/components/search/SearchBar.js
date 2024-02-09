import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase.js';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
        try {
            const clubCollection = collection(firestore, 'clubs');
            const querySnapshot = await getDocs(clubCollection);
            const fetchedClubs = [];
            querySnapshot.forEach((doc) => {
                fetchedClubs.push({ id: doc.id, ...doc.data() });
            });
            setClubs(fetchedClubs);
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