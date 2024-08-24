const express = require('express');
const router = express.Router();
const teacherAuthController = require('../controllers/teacherAuthController');

router.post('/', teacherAuthController.handleTeacher);
router.put('/', teacherAuthController.updatePassword);
router.put('/reset', teacherAuthController.updatePassword);

module.exports = router;