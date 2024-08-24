const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    faculty: {
        type: String,
        required: true
    },
    subjects: {
        type: Array,
        required: true
    },
    students: {
        type: Array,
        required: true
    }
    });

module.exports = mongoose.model('Faculty', facultySchema);