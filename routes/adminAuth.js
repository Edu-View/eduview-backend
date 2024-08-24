const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

router.post('/', adminAuthController.handleAdmin);
router.put('/', adminAuthController.updatePassword);

module.exports = router;