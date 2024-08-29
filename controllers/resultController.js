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



const scheduleResultUpdate = (data, scheduledTime) => {
    const now = new Date();
    const delay = new Date(scheduledTime).getTime() - now.getTime();

    if (delay > 0) {
        setTimeout(async () => {
            try {
                const examResult = await ExamResult.findOne({ rollno: data.rollno }).exec();
                if (!examResult) {
                    console.log(`No result found for roll number ${data.rollno}, not updating.`);
                    return;
                }

                examResult.subjects = data.subjects;
                examResult.grading = data.grading;
                examResult.gradeScore = data.gradeScore;
                const updatedResult = await examResult.save();
            } catch (err) {
                console.error('Error updating result:', err);
            }
        }, delay);
    } else {

        updateResultImmediately(data);
    }
};

const updateResultImmediately = async (data) => {
    try {
        const examResult = await ExamResult.findOne({ rollno: data.rollno }).exec();
        if (!examResult) {
            console.log(`No result found for roll number ${data.rollno}, not updating.`);
            return;
        }

        examResult.subjects = data.subjects;
        examResult.grading = data.grading;
        examResult.gradeScore = data.gradeScore;
        const updatedResult = await examResult.save();

        console.log(`Result for roll number ${data.rollno} updated immediately!`);
    } catch (err) {
        console.error('Error updating result:', err);
    }
};

const updateResult = async (req, res) => {
    const { rollno, subjects, grading, gradeScore, scheduledTime } = req.body;

    // Validate required fields
    if (!rollno || !subjects || !grading || !gradeScore || !scheduledTime) {
        return res.status(400).json({ message: 'Please fill all the required fields' });
    }

    // Schedule the result update
    scheduleResultUpdate({ rollno, subjects, grading, gradeScore }, scheduledTime);

    res.status(200).json({ success: `Update for roll number ${rollno} scheduled!` });
};


const scheduleDeleteResult = (rollno, scheduledTime) => {
    const now = new Date();
    const delay = new Date(scheduledTime).getTime() - now.getTime();

    if (delay > 0) {
        setTimeout(async () => {
            try {
                await ExamResult.deleteOne({ rollno: rollno }).exec();
                console.log(`Result for roll number ${rollno} deleted!`);
            } catch (err) {
                console.error('Error deleting result:', err);
            }
        }, delay);
    } else {
        console.log('Scheduled time is in the past, deleting immediately.');
        deleteResultImmediately(rollno);
    }
};

const deleteResultImmediately = async (rollno) => {
    try {
        await ExamResult.deleteOne({ rollno: rollno }).exec();
        console.log(`Result for roll number ${rollno} deleted immediately!`);
    } catch (err) {
        console.error('Error deleting result:', err);
    }
};

const deleteResult = async (req, res) => {
    const { rollno, scheduledTime } = req.body;

    if (!rollno) {
        return res.status(400).json({ message: 'Roll number is required' });
    }

    const examResult = await ExamResult.findOne({ rollno }).exec();

    if (!examResult) {
        return res.status(204).json({ message: `No result matches roll number ${rollno}.` });
    }

    if (scheduledTime) {
        // Schedule the deletion
        scheduleDeleteResult(rollno, scheduledTime);
        return res.status(200).json({ success: `Deletion for roll number ${rollno} scheduled!` });
    } else {
        // Delete immediately if no scheduled time is provided
        await deleteResultImmediately(rollno);
        return res.status(200).json({ success: `Result for roll number ${rollno} deleted immediately!` });
    }
};


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