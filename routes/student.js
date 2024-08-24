const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

router.post('/', StudentController.addStudent);
router.get('/', StudentController.getAllStudent);
router.delete('/',StudentController.deleteStudent)
router.put('/',StudentController.updateStudent)

module.exports = router;