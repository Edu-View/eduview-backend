const Assessment = require('../model//Assessment');

const addAssessment = async (req, res) => {
    const { rollno, subjects, marks, type } = req.body;
    if (!rollno || !subjects || !marks || !type) return res.status(400).json({ 'message': 'Please fill all the required fields' });


    try {
        const result = await Assessment.create({
            "rollno": rollno,
            "subjects": subjects,
            "marks": marks,
            "type": type,
        });

        res.status(201).json({ 'success': `New Assessment for ${rollno} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getAllAssessment = async (req, res) => {
    const result = await Assessment.find()
    if (!result) return res.status(204).json({ 'message': "No Assessment Found." })
    res.json(result)
}

const deleteAssessment = async (req, res) => {

    if (!req?.body?.id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const assessment = await Assessment.findOne({ _id: req.body.id }).exec()
    if (!assessment) {
        return res.status(204).json({ "message": `No Assessment mathes ${req.body.id} ` });
    }
    const result = await Assessment.deleteOne({ _id: req.body.id })
    res.json(result);
}

const updateAssessment = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ 'message': "ID parameter is required" })
    }
    const assessment = await Assessment.findOne({ _id: req.body.id }).exec()
    if (!assessment) {
        return res.status(204).json({ "message": `No Assessment mathes ${req.body.id} ` });
    }

    assessment.rollno = req.body.rollno;
    assessment.marks = req.body.marks;
    const result = await assessment.save()
    res.json(result)
}

const deleteAllAssessments = async (req, res) => {
    try {
        // Delete all documents in the Assessment collection
        const result = await Assessment.deleteMany({});

        // If no documents were deleted, return a 204 No Content
        if (result.deletedCount === 0) {
            return res.status(204).json({ message: "No assessments found to delete." });
        }

        // Return the result of the deletion
        return res.json({ message: `${result.deletedCount} assessments deleted.` });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};





module.exports = { addAssessment, getAllAssessment, deleteAssessment, updateAssessment, deleteAllAssessments };