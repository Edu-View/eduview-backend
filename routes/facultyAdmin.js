const express = require('express');
const router = express.Router();
const facultyAdminAuthController = require('../controllers/facultyAdminController');

router.post('/', facultyAdminAuthController.addFacultyAdmin);
router.get('/', facultyAdminAuthController.getAllFacultyAdmin);
router.put('/', facultyAdminAuthController.updateFacultyAdmin);
router.delete('/', facultyAdminAuthController.deleteFacultyAdmin);

module.exports = router;