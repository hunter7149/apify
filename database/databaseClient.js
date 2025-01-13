const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres:root@192.168.60.196:5432/student", // Add your PostgreSQL connection string here
});
module.exports=client;