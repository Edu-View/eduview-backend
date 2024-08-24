const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultyAdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
            type: String,
            default: "Faculty Admin"
    },
    refreshToken: String
});

module.exports = mongoose.model('FacultyAdmin', facultyAdminSchema);