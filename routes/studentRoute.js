const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.route('/create').post(studentController.createStudent);
router.route('/get').get(studentController.getStudent);

module.exports = router;