const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    rollno: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        default:"Student"
    },
    refreshToken: String
});

module.exports = mongoose.model('Student', studentSchema);