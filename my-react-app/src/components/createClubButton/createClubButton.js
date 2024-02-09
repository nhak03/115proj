import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import { db } from '../../firebase.js';
// import { collection, addDoc } from "firebase/firestore"; 


const CreateClubButton = () => {
    const [clubName, setClubName] = useState('');
    const [clubType, setClubType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation: Ensure both fields are filled out
        if (!clubName || !clubType) {
            setErrorMessage('Please fill out all fields.');
            return;
        };

        // await addDoc(collection(db, "clubs"), {
        //     name: clubName,
        //     type: clubType
        // });

        try {
          const backend_response = await fetch('/createClub', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clubName, clubType }),
          });
      
          if (backend_response.ok) {
              console.log('User input sent to server successfully!');
              const backendStatus = await backend_response.json(); // Parse response JSON
              if (backendStatus.success) {
                setSubmitted(true);
              }
            }
        } catch (error) {
          console.error('Error making POST request:', error);
        }
        
    
        // Clear the form
        setClubName('');
        setClubType('');
        setErrorMessage('');
        
    };

    return (
        <div>
          <Popup
            trigger={<button> Create a Club? </button>}
            modal
            nested
          >
            {close => (
              <div className='modal'>
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div>
                  {submitted ? (
                    <div>
                      <h2>Success!</h2>
                      <p>You have created your club</p>
                    </div>
                  ) : (
                    <div>
                        <h2>Fill out the form to create a club</h2>
                        <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="clubName">Club Name:</label>
                            <input 
                            type="text" 
                            id="clubName" 
                            value={clubName} 
                            onChange={(e) => setClubName(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label htmlFor="clubType">Club Type:</label>
                            <input 
                            type="text" 
                            id="clubType" 
                            value={clubType} 
                            onChange={(e) => setClubType(e.target.value)} 
                            />
                        </div>
                        <button type="submit">Create Club</button>
                        </form>
                    </div>
                  )}
                  <div />
                  {errorMessage && <p>{errorMessage}</p>}         
                </div>
                <div>
                  <button onClick={() => close()}>Cancel</button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      );      
};

export default CreateClubButton