// src/TerminalForm.js
import React, { useState } from 'react';

function TerminalForm() {
  const [userInput, setUserInput] = useState('');
  const [calc_res, set_res] = useState('');
  const [invalid, set_invalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput }),
      });

      if (response.ok) {
        console.log('User input sent to server successfully!');
        const responseData = await response.json(); // get the information from the backend
        set_invalid(false);
        set_res(responseData.calc_res);
      } else {
        set_res(null);
        set_invalid(true);
        console.error('Error sending user input to server:', response.statusText);
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      
        {calc_res != null && <p>That times 11 is {calc_res}</p>}
        {invalid && <p>That's not a number!</p>}
      
    </div>
  );
}

export default TerminalForm;