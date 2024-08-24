const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    }
    ,
    semester: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Subject', subjectSchema);