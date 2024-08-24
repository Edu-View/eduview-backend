const express = require('express');
const router = express.Router();
const addTeacherController = require('../controllers/teacherController');

router.post('/', addTeacherController.addTeacher);
router.get('/', addTeacherController.getAllTeacher);
router.put('/', addTeacherController.updateTeacher);
router.delete('/', addTeacherController.deleteTeacher);


module.exports = router;