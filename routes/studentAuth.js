const express = require('express');
const router = express.Router();
const studentAuthController = require('../controllers/studentAuthController');

router.post('/', studentAuthController.handleStudent);
router.put('/', studentAuthController.updatePassword);
router.put('/reset', studentAuthController.resetPassword);

module.exports = router;