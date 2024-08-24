const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.post('/', subjectController.addSubject);
router.get('/', subjectController.getAllSubject);
router.delete('/',subjectController.deleteSubject)

module.exports = router;