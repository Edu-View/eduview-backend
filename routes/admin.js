const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/', adminController.addAdmin);
router.get('/', adminController.getAllAdmin);
router.delete('/', adminController.deleteAdmin);

module.exports = router;