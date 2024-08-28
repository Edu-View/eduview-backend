const cron = require('node-cron');
const ExamResult = require('../model/ExamResult'); // Import your model

const getAllResult = async (req, res) => {
    const result = await ExamResult.find()
    if (!result) return res.status(204).json({ 'message': "No Result Found." })
    res.json(result)
}

// Function to schedule the result posting
const scheduleResultPosting = (data, scheduledTime) => {
    const now = new Date();
    const delay = new Date(scheduledTime).getTime() - now.getTime();

    if (delay > 0) {
        setTimeout(async () => {
            try {
                const duplicate = await ExamResult.findOne({ rollno: data.rollno }).exec();
                if (duplicate) {
                    console.log('Duplicate found, not saving.');
                    return;
                }

                const result = await ExamResult.create(data);
            } catch (err) {
                console.error('Error creating result:', err);
            }
        }, delay);
    } else {
        console.log('Scheduled time is in the past, executing immediately.');
        createResultImmediately(data);
    }
};

const createResultImmediately = async (data) => {
    try {
        const duplicate = await ExamResult.findOne({ rollno: data.rollno }).exec();
        if (duplicate) {
            console.log('Duplicate found, not saving.');
            return;
        }

        const result = await ExamResult.create(data);
        console.log(`Result for roll number ${data.rollno} created immediately!`);
    } catch (err) {
        console.error('Error creating result:', err);
    }
};

const addResult = async (req, res) => {
    const { rollno, subjects, grading, gradeScore, semester, scheduledTime } = req.body;

    // Validate required fields
    if (!rollno || !subjects || !grading || !gradeScore || !semester || !scheduledTime) {
        return res.status(400).json({ message: 'Please fill all the required fields' });
    }

    // Schedule the result posting
    scheduleResultPosting({ rollno, subjects, grading, gradeScore, semester }, scheduledTime);

    res.status(201).json({ success: `Result for roll number ${rollno} scheduled!` });
};



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