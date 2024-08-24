const Teacher = require('../model/Teacher');
const bcrypt = require('bcrypt');

const addTeacher = async (req, res) => {
    const { username, email, subjectcode, pwd, faculty, students } = req.body;
    if (!username || !email || !subjectcode || !pwd || !faculty || !students) return res.status(400).json({ 'message': 'Please fill all the required field' });

    // check for duplicate email in the db
    const duplicate = await Teacher.findOne({ email }).exec();
    if (duplicate) return res.sendStatus(409);

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new teacher
        const result = await Teacher.create({
            "username": username,
            "email": email,
            "subjectcode": subjectcode,
            "students": students,
            "password": hashedPwd,
            "faculty": faculty
        });

        res.status(201).json({ 'success': `New Teacher ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllTeacher = async (req, res) => {
    const teacher = await Teacher.find()
    if (!teacher) return res.status(204).json({ 'message': "No teacher Found." })
    res.json(teacher)
}

const updateTeacher = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const teacher = await Teacher.findOne({ _id: req.body.id }).exec()

    if (!teacher) {
        return res.status(204).json({ "message": `No Teacher mathes ${req.body.id} ` });
    }
    if (req.body.username) teacher.username = req.body.username;
    if (req.body.email) teacher.email = req.body.email;
    if (req.body.students) teacher.students = req.body.students;
    if (req.body.subjectcode) teacher.subjectcode = req.body.subjectcode;
    const result = await teacher.save()
    res.json(result)
}

const deleteTeacher = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const teacher = await Teacher.findOne({ _id: req.body.id }).exec()
    if (!teacher) {
        return res.status(204).json({ "message": `No Teacher mathes ${req.body.id}` });
    }
    const result = await Teacher.deleteOne({ _id: req.body.id })
    res.json(result);
}

module.exports = { addTeacher, getAllTeacher, updateTeacher, deleteTeacher };