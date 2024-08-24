const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

router.post('/', assessmentController.addAssessment);
router.get('/', assessmentController.getAllAssessment);
router.delete('/', assessmentController.deleteAssessment);
router.delete('/all', assessmentController.deleteAllAssessments);
router.put('/', assessmentController.updateAssessment);


module.exports = router;