const ExamResult = require('../model/ExamResult');

const addResult = async (req, res) => {
    const { rollno, subjects, grading, gradeScore, semester } = req.body;
    if (!rollno || !subjects || !grading || !gradeScore || !semester) return res.status(400).json({ 'message': 'Please fill all the required fields' });

    // check for duplicate usernames in the db
    const duplicate = await ExamResult.findOne({ rollno }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        const result = await ExamResult.create({
            "rollno": rollno,
            "subjects": subjects,
            "grading": grading,
            "gradeScore": gradeScore,
            "semester": semester
        });
        res.status(201).json({ 'success': `New Resultfor ${rollno} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getAllResult = async (req, res) => {
    const result = await ExamResult.find()
    if (!result) return res.status(204).json({ 'message': "No Result Found." })
    res.json(result)
}

const updateResult = async (req, res) => {
    if (!req?.body?.rollno) {
        return res.status(400).json({ 'message': "rollno is required" })
    }
    const examResult = await ExamResult.findOne({ rollno: req.body.rollno }).exec()

    if (!examResult) {
        return res.status(204).json({ "message": `No result mathes ${req.body.rollno} ` });
    }
    examResult.subjects = req.body.subjects;
    examResult.grading = req.body.grading;
    examResult.gradeScore = req.body.gradeScore;



    const result = await examResult.save()
    res.json(result)
}

const deleteResult = async (req, res) => {
    if (!req?.body?.rollno) {
        return res.status(400).json({ 'message': "roll no is required" })
    }
    const examResult = await ExamResult.findOne({ rollno: req.body.rollno }).exec()

    if (!examResult) {
        return res.status(204).json({ "message": `No result mathes ${req.body.rollno} ` });
    }
    const result = await examResult.deleteOne({ rollno: req.body.rollno })
    res.json(result);
}

const deleteAllResult = async (req, res) => {
    try {
        // Delete all documents in the Assessment collection
        const result = await ExamResult.deleteMany({});
        if (result.deletedCount === 0) {
            return res.status(204).json({ message: "No results found to delete." });
        }
        return res.json({ message: `${result.deletedCount} results deleted.` });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


module.exports = { addResult, getAllResult, updateResult, deleteResult, deleteAllResult };