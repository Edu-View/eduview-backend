const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.post('/', facultyController.addFaculty);
router.get('/', facultyController.getAllFaculty);
router.delete('/',facultyController.deleteFaculty)
router.put('/',facultyController.updateFaculty)

module.exports = router;