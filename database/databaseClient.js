// const { Client } = require('pg');
// const client = new Client({
//   connectionString: "postgresql://postgres:root@192.168.60.135:5432/student", // Add your PostgreSQL connection string here
// });
// module.exports=client;
// const { Client } = require('pg');
// const client = new Client({
//   connectionString: "postgresql://postgres:Rem@rk@2023@db#@localhost:5432/test", // Add your PostgreSQL connection string here
// });
// module.exports=client;

const  Client  = require('pg').Pool;
const client = new Client({
  user:"postgres",
  host:"localhost",
  database:"test",
  password:"Rem@rk@2023@db#",
  port:5432,
  

  // connectionString: "postgresql://postgres:Rem@rk@2023@db#@localhost:5432/test", // Add your PostgreSQL connection string here
});
module.exports=client;



// const  Client  = require('pg').Pool;
// const client = new Client({
//   user:"postgres",
//   host:"192.168.60.135",
//   database:"student",
//   password:"root",
//   port:5432,
  

//   // connectionString: "postgresql://postgres:Rem@rk@2023@db#@localhost:5432/test", // Add your PostgreSQL connection string here
// });
// module.exports=client;