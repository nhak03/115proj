//
// Creating Posts
//

import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const CreatePost = () =>
{
    // Fields for post contents
    const [ organizationName, setOrganizationName ] = useState('');
    const [    postTitle    ,    setPostTitle     ] = useState('');
    const [ postDescription , setPostDescription  ] = useState('');
    
    // TODO: Optional other fields
    // const[ ... ]


    const [  errorMessage  ,   setErrorMessage  ] = useState('');
    const [   submitted    ,    setSubmitted    ] = useState(false);


    const handleSubmit = async (e) =>
    {
        e.preventDefault();
    
        // Validation: Ensure both fields are filled out
        if (!organizationName || !postTitle || !postDescription)
        {
            setErrorMessage('Please fill out all fields.');
            return;
        };

        //
        // TODO: Send stuff to backend
        //
        try {
          const backend_response = await fetch('/makePost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ organizationName, postTitle, postDescription }),
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
        setOrganizationName('');
        setPostTitle('');
        setPostDescription('');
        setErrorMessage('');
    };

    return (
        <div>
          <Popup
            trigger = {<button> Create a post </button>}
            modal
            nested
          >
            {close => (
              <div className = 'modal'>
                <button className = "close" onClick = {close}>
                  &times;
                </button>
                <div>
                {/* Check if post has been submitted */}
                  {submitted ? (
                    <div>
                      <h2>Success!</h2>
                      <p>Post created</p>
                    </div>
                  ) : (
                    <div>
                        {/* Prompt user with the post creation form */}
                        <h2>Fill out the form to create a post</h2>
                        <form onSubmit={handleSubmit}>
                        

                        {/* Fill in the necessary fields */}

                        {/* Organization name field */}
                        <div>
                            <label htmlFor = "organizationName">Organization name:</label>
                            <input 
                            type     = "text"
                            id       = "organizationName" 
                            value    = {organizationName} 
                            onChange = {(e) => setOrganizationName(e.target.value)} 
                            />
                        </div>

                        {/* Post title field */}
                        <div>
                            <label htmlFor = "postTitle">Post title:</label>
                            <input 
                            type     = "text" 
                            id       = "postTitle" 
                            value    = {postTitle} 
                            onChange = {(e) => setPostTitle(e.target.value)} 
                            />
                        </div>

                        {/* Post description field */}
                        <div>
                            <label htmlFor = "postDescription">Post description:</label>
                            <input 
                            type     = "text" 
                            id       = "postDescription" 
                            value    = {postDescription} 
                            onChange = {(e) => setPostDescription(e.target.value)} 
                            />
                        </div>
                        {/* End of fields */}

                        {/* Handle post submission */}
                        <button type = "submit">Create post</button>
                        </form>
                    </div>
                  )}
                  <div/>
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

export default CreatePost
