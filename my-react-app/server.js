const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

// Parse incoming JSON data
app.use(bodyParser.json());

// Serve static assets from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve the React app's index.html at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/terminal', (req, res) => {
    const userInput = req.body.input;
    console.log('User input from terminal:', userInput);
    res.send('Input received!');
});

// // New route for handling GET requests to the root path
// app.get('/', (req, res) => {
//     res.send('Hello from the server!'); // Or any response you want
// });

app.get("/foo", (req, res) => {
    res.send("You've requested the foo page.");
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});