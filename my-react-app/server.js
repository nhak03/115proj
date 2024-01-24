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
  res.status(200).json({ message: 'Selection received successfully' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
