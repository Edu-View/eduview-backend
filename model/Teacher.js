const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subjectcode: {
        type: Array,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    students: {
        type: Array,
        required: true
    },
    roles: {
            type: String,
            default: "Teacher"
    },
    refreshToken: String
});

module.exports = mongoose.model('Teacher', teacherSchema);