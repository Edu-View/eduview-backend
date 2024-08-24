const Semester = require('../model/Semester');

const addSemester =async(req,res)=>{
    const {semester} = req.body;
    if(!semester) return res.status(400).json({ 'message': 'Semester field is required' });
    const duplicate = await Semester.findOne({ semester }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try{
        await Semester.create({
            "semester" : semester
        });

        res.status(201).json({ 'success': `New semester ${semester} created!` });
    }
    catch(err){
        res.status(500).json({ 'message': err.message });
    }
}

const getAllSemester = async(req, res) => {
    const semester = await Semester.find()
    if(!semester) return res.status(204).json({'message':"No Semester Found."})
    res.json(semester)
}

const deleteSemester = async(req, res) => {
    if(!req?.body?.id ){
        return res.status(400).json({'message' :"ID parameter is required"})
    }
    const semester = await Semester.findOne({_id:req.body.id}).exec()
    if (!semester) {
        return res.status(204).json({ "message": `No Semester mathes ${req.body.id} ` });
    }
    const result = await Semester.deleteOne({_id:req.body.id})
    res.json(result);
}

module.exports = {addSemester,getAllSemester,deleteSemester}