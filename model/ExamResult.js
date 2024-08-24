const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examResultSchema = new Schema({
    rollno: {
        type: String,
        required: true
    },
    subjects: {
        type: Array,
        required: true
    },
    grading: {
        type: Array,
        required: true
    },
    gradeScore: {
        type: Array,
        required: true
    },
    semester: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ExamResult', examResultSchema);