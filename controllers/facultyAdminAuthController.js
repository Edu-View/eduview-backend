const bcrypt = require('bcrypt');
const FacultyAdmin = require('../model/FacultyAdmin');


const handleFacultyAdmin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required.' });
    const foundUser = await FacultyAdmin.findOne({ email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = foundUser.roles;
        res.json({ roles });
    } else {
        res.sendStatus(401);
    }
}

const updatePassword = async (req, res) => {
    const { email, pwd, newPwd } = req.body;
    if (!newPwd || !pwd || !email) return res.status(400).json({ 'message': 'Passwords and email are required.' });
    const foundUser = await FacultyAdmin.findOne({ email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const hashedPwd = await bcrypt.hash(req.body.newPwd, 10);
        foundUser.password = hashedPwd;
        const result = await foundUser.save()
        res.json(result)
    } else {
        res.sendStatus(401);
    }

}

const resetPassword = async (req, res) => {
    const { email, pwd } = req.body;
    console.log(email)
    console.log(pwd)
    if (!email || !pwd) return res.status(400).json({ 'message': "Password and email are required" })
    const foundUser = await FacultyAdmin.findOne({ email }).exec()
    console.log(foundUser)
    if (!foundUser) return res.sendStatus(401)
    const hashedPwd = await bcrypt.hash(pwd, 10);
    foundUser.password = hashedPwd;
    const result = await foundUser.save()
    res.json(result)
}

module.exports = { handleFacultyAdmin, updatePassword, resetPassword };