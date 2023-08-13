 const express = require('express');
const errorHandler = require('./middleware/errorHandler');
 const dotenv = require('dotenv').config();
const app = express();
const port = process.env.port || 5002;

const cors = require('cors');


// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// app.use('/student',require("./routes/studentRoute"));
app.use('/api/v1',require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => console.log(`Apifly app listening on port ${port}!`));