const Faculty = require('../model/Faculty');

const addFaculty = async (req, res) => {
    const { faculty, subjects, students } = req.body;
    if (!faculty || !subjects || !students) return res.status(400).json({ 'message': 'Please fill out the required fields' });
    const duplicate = await Faculty.findOne({ faculty }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        await Faculty.create({
            "faculty": faculty,
            "subjects": subjects,
            "students": students
        });

        res.status(201).json({ 'success': `New faculty ${faculty} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllFaculty = async (req, res) => {
    const faculty = await Faculty.find()
    if (!faculty) return res.status(204).json({ 'message': "No Faculty Found." })
    res.json(faculty)
}

const deleteFaculty = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const faculty = await Faculty.findOne({ _id: req.body.id }).exec()
    if (!faculty) {
        return res.status(204).json({ "message": `No Faculty mathes ${req.body.id} ` });
    }
    const result = await Faculty.deleteOne({ _id: req.body.id })
    res.json(result);
}

const updateFaculty = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const faculty = await Faculty.findOne({ _id: req.body.id }).exec()
    console.log(req.body.students)
    if (!faculty) {
        return res.status(204).json({ "message": `No Faculty mathes ${req.body.id} ` });
    }

    if (req.body.students) faculty.students = req.body.students;

    const result = await faculty.save()
    res.json(result)
}

module.exports = { addFaculty, getAllFaculty, deleteFaculty, updateFaculty }