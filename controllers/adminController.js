const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');

const addAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await Admin.findOne({ email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await Admin.create({
            "email": email,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New Admin created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getAllAdmin = async (req, res) => {
    const admin = await Admin.find()
    if (!admin) return res.status(204).json({ 'message': "No admin Found." })
    res.json(admin)
}

const deleteAdmin = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const admin = await Admin.findOne({ _id: req.body.id }).exec()
    if (!admin) {
        return res.status(204).json({ "message": `No Admin mathes ${req.body.id} ` });
    }
    const result = await Admin.deleteOne({ _id: req.body.id })
    res.json(result);
}


module.exports = { addAdmin, getAllAdmin, deleteAdmin };