const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Handle POST requests to the '/foo' endpoint
app.post('/foo', (req, res) => {
    const { selection } = req.body;

    // Print the submitted data to the terminal
    console.log('Submitted Selection:', selection);

    // Optionally, you can send a response back to the client
    // res.status(200).json({ message: 'Selection received successfully' });

    // Send the special message back to the client
    let specialMessage = '';
    if (selection === 'apples') {
        specialMessage = 'APPLES! YIPPEE!';
        res.status(200).json({ message: 'Selection received successfully', specialMessage });
    } else {
        specialMessage = 'No special message for this selection.';
    }
  
});

app.post('/', (req, res) => {
    const  userInput  = req.body;

    console.log("Submitted text: ", userInput);
    const number = parseInt(userInput.input, 10);

    if(!isNaN(number)){
        console.log("Valid num: ", number);

        calc_res = number * 11;
        res.status(200).json({ message: 'Number received successfully', calc_res });

    }
    else{
        console.log("Not a valid num");
        invalid = true;
        res.status(400).json({message: 'That was not a number', invalid});
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
