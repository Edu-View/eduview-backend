const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/', resultController.addResult);
router.get('/', resultController.getAllResult);
router.put('/', resultController.updateResult);
router.delete('/', resultController.deleteResult);
router.delete('/all', resultController.deleteAllResult);

module.exports = router;