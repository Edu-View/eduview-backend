const Subject = require('../model/Subject');

const addSubject = async (req, res) => {
    const { subject, type, semester, name, faculty } = req.body;
    if (!subject || !type || !semester || !name || !faculty) return res.status(400).json({ 'message': 'Subject field is required' });
    const duplicate = await Subject.findOne({ subject }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        await Subject.create({
            "subject": subject,
            "name": name,
            "type": type,
            "semester": semester,
            "faculty": faculty
        });

        res.status(201).json({ 'success': `New Subject ${subject} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllSubject = async (req, res) => {
    const subject = await Subject.find()
    if (!subject) return res.status(204).json({ 'message': "No Subject Found." })
    res.json(subject)
}

const deleteSubject = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const subject = await Subject.findOne({ _id: req.body.id }).exec()
    if (!subject) {
        return res.status(204).json({ "message": `No Subject mathes ${req.body.id} ` });
    }
    const result = await Subject.deleteOne({ _id: req.body.id })
    res.json(result);
}

module.exports = { addSubject, getAllSubject, deleteSubject }