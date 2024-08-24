const FacultyAdmin = require('../model/FacultyAdmin')
const bcrypt = require('bcrypt');

const addFacultyAdmin = async (req, res) => {
    const { username, email, faculty, pwd } = req.body;
    if (!username || !email || !faculty || !pwd) return res.status(400).json({ 'message': 'Please fill all the required field' });

    const duplicate = await FacultyAdmin.findOne({ email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    const faculty_duplicate = await FacultyAdmin.findOne({ faculty }).exec();
    if (faculty_duplicate) return res.sendStatus(409); //Conflict

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await FacultyAdmin.create({
            "username": username,
            "email": email,
            "faculty": faculty,
            "password": hashedPwd
        });

        res.status(201).json({ 'success': `New Faculty Admin ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllFacultyAdmin = async (req, res) => {
    const admin = await FacultyAdmin.find()
    if (!admin) return res.status(204).json({ 'message': "No Faculty Admin Found." })
    res.json(admin)
}
const deleteFacultyAdmin = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const admin = await FacultyAdmin.findOne({ _id: req.body.id }).exec()
    if (!admin) {
        return res.status(204).json({ "message": `No Faculty admin mathes ${req.body.id} ` });
    }
    const result = await FacultyAdmin.deleteOne({ _id: req.body.id })
    res.json(result);
}

const updateFacultyAdmin = async (req, res) => {
    const { username, email, faculty, id } = req.body;
    if (!username, !email, !faculty, !id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const admin = await FacultyAdmin.findOne({ _id: req.body.id }).exec()
    if (!admin) {
        return res.status(204).json({ "message": `No Faculty Admin mathes ${req.body.id} ` });
    }

    admin.username = req.body.username;
    admin.email = req.body.email;
    admin.faculty = req.body.faculty;
    const result = await admin.save()
    res.json(result)
}

module.exports = { addFacultyAdmin, getAllFacultyAdmin, updateFacultyAdmin, deleteFacultyAdmin };