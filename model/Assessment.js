const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assessmentSchema = new Schema({
    rollno: {
        type: String,
        required: true
    },
    subjects: {
        type: String,
        required: true
    },
    marks: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Assessment', assessmentSchema);