const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres:root@localhost:5432/development", // Add your PostgreSQL connection string here
});
module.exports=client;