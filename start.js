 const express = require('express');
const errorHandler = require('./middleware/errorHandler');
 const dotenv = require('dotenv').config();
const app = express();
const port = process.env.port || 5000;

// Connect to PostgreSQL
const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres:root@localhost:5432/student", // Add your PostgreSQL connection string here
});
client.connect();
app.use(express.json());
app.use('/contact',require('./routes/contactRoutes'));
app.use('/student',require("./routes/studentRoute"));
app.use(errorHandler);
app.listen(port, () => console.log(`Apifly app listening on port ${port}!`));