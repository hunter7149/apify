const Student = require('../entity/student');
const studentRepository = require('../repository/studentRepository');

const createStudent = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Name field is mandatory' });
    } else {
      const newStudent = new Student(name, email, phone);
      const studentData = await studentRepository.createStudent(newStudent);
      res.status(201).json(studentData);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student.' });
  }
};

const getStudent = async (req, res) => {
  console.log("This is the request: ", req.body);
  res.body = req.body;
  if (!res.body['name']) {
    res.status(401);
    console.log("Error occurred and status code is", res.statusCode);
    throw new Error("Error");
  } else {
    res.status(200).json({ name: res.body['name'] });
  }
};

module.exports = {
  createStudent,
  getStudent,
};