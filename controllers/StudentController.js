const Student = require('../model/Student');
const bcrypt = require('bcrypt');

const addStudent = async (req, res) => {
    const { rollno, username, email, pwd, semester } = req.body;

    if (!rollno || !username || !email || !pwd || !semester) return res.status(400).json({ 'message': 'Please fill all the required field' });
    // check for duplicate usernames in the db
    const duplicate = await Student.findOne({ rollno }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await Student.create({
            "rollno": rollno,
            "username": username,
            "email": email,
            "password": hashedPwd,
            "semester": semester
        });

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


const getAllStudent = async (req, res) => {
    const student = await Student.find()
    if (!student) return res.status(204).json({ 'message': "No Student Found." })
    res.json(student)
}

const deleteStudent = async (req, res) => {

    if (!req?.body?.id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const employee = await Student.findOne({ _id: req.body.id }).exec()
    if (!employee) {
        return res.status(204).json({ "message": `No Student mathes ${req.body.id} ` });
    }
    const result = await Student.deleteOne({ _id: req.body.id })
    res.json(result);
}

const updateStudent = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const student = await Student.findOne({ _id: req.body.id }).exec()
    if (!student) {
        return res.status(204).json({ "message": `No Student mathes ${req.body.id} ` });
    }

    student.username = req.body.username;
    student.rollno = req.body.rollno;
    student.email = req.body.email;
    student.semester = req.body.semester;
    const result = await student.save()
    res.json(result)
}

module.exports = { addStudent, getAllStudent, deleteStudent, updateStudent };