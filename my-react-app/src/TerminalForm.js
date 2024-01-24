// src/TerminalForm.js
import React, { useState } from 'react';

function TerminalForm() {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput }),
      });

      if (response.ok) {
        console.log('User input sent to server successfully!');
        // Optionally, clear the input field or display a success message
        setUserInput('');
      } else {
        console.error('Error sending user input to server:', response.statusText);
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TerminalForm;