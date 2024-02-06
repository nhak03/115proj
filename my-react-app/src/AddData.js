import React, { useState } from 'react';

function AddData() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [recieved, setRecieved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

  // Validation: Ensure all fields are filled
  if (!title || !author || !description) {
    setInvalid(true);
    return;
  }

  try {
    const response = await fetch('/AddData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, description, image }),
    });

    if (response.ok) {
        console.log('User input sent to server successfully!');
        setInvalid(false);
        const responseData = await response.json(); // Parse response JSON
        if (responseData.success) {
          setRecieved(true);
        }
      } else {
        setRecieved(false); // Reset the state
        setInvalid(true);
      }
  } catch (error) {
    console.error('Error making POST request:', error);
  }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Image (optional):
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <button type="submit" disabled={!title || !author || !description}>Submit</button>
      </form>

      {invalid && <p>Please fill out all fields!</p>}
      {recieved && <p>Server successfully recieved your submission!</p>}
    </div>
  );
}

export default AddData;