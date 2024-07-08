const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const app = express();
const cors = require('cors'); // Import cors


const corsOptions = {
  origin: 'http://localhost:3002', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};


app.use(cors(corsOptions)); // Use cors with options

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Ensure JSON parsing

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route handler definitions
app.use('/', router);

const PORT = 8031;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
