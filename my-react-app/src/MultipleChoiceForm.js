// src/MultipleChoiceForm.js
import React, { useState } from 'react';

function MultipleChoiceForm() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/foo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selection: selectedOption }),
      });

      if (response.ok) {
        console.log('Selection sent to server successfully!');
        // Optionally, clear the selection or display a success message
      } else {
        console.error('Error sending selection to server:', response.statusText);
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>YOU ARE IN FOO</h1>
      <label>
        Select one:
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="apples">apples</option>
          <option value="butter">butter</option>
          <option value="charlie">charlie</option>
          <option value="duff">duff</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MultipleChoiceForm;