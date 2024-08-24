const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    semester: {
        type: String,
        required: true
    }
    });

module.exports = mongoose.model('Semester', semesterSchema);