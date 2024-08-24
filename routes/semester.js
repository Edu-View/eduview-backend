const express = require('express');
const router = express.Router();
const semesterController = require('../controllers/semesterController');

router.post('/', semesterController.addSemester);
router.get('/', semesterController.getAllSemester);
router.delete('/',semesterController.deleteSemester)

module.exports = router;