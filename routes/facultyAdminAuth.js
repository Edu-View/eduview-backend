const express = require('express');
const router = express.Router();
const facultyAdminAuthController = require('../controllers/facultyAdminAuthController');

router.post('/', facultyAdminAuthController.handleFacultyAdmin);
router.put('/', facultyAdminAuthController.updatePassword);
router.put('/reset', facultyAdminAuthController.resetPassword)

module.exports = router;