const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres:root@localhost:5432/student", // Add your PostgreSQL connection string here
});
client.connect();

const createStudent = async (studentData) => {
  try {
    const { name, email, phone } = studentData;
    const query = 'INSERT INTO students (name, email, phone) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, phone];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Failed to create student.');
  }
};

module.exports = {
  createStudent,
};