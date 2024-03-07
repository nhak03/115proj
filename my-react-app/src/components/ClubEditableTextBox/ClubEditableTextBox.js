import React, { useState, useEffect } from 'react';
import { updateDocKVPair } from '../../pages/FirestoreService.js';

function ClubEditableTextBox({ initialText, formTitle, Club_Doc_ID, pageOwnerStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const [ownerStatus, setOwnerStatus] = useState(pageOwnerStatus)
  const [textInput, setTextInput] = useState(initialText);

  useEffect(() => {
    // Update textInput state when initialText changes
    setOwnerStatus(pageOwnerStatus)
    setTextInput(initialText);
  }, [initialText]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const docPath = `clubs/${Club_Doc_ID}`;
    const contentKey = formTitle;
    const content = textInput;
    await updateDocKVPair(docPath, contentKey, content);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleCancel = () => {
    setTextInput(initialText);
    setIsEditing(false);
  };

  if (ownerStatus) { // if they are page owner allow editing
    if (isEditing) {
      return (
        <div>
          <h2>{formTitle}</h2>
          <form onSubmit={handleSubmit}>
          <input type="text" value={textInput} onChange={handleChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{formTitle}</h2>
          <span>{textInput}</span>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      );
    }
  }
  else {
    return (
      <div>
        <h2>{formTitle}</h2>
        <span>{textInput}</span>
      </div>
    );
  }
  
}

export default ClubEditableTextBox;