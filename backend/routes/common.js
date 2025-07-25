const { model } = require("mongoose");

const { Classes , Student } = require("../models/Scheam.js")
const router = require("express").Router();



router.get("/student-by-class/:className", async(req,res) =>{
    const className = req.params.className;
    try{
        const classWithStudents = await Classes.aggregate([
            {

                $match: {
                    className: className
                },
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'students',
                    foreignField: 'studentId',
                    as: 'studentDetails'
                }
            },
            {

                $project: {
                    _id: 0,
                    className: 1,
                    studentDetails: {
                        studentId: 1,
                        name: 1,
                        age: 1,
                        gender: 1
                    }
                }
            }

        ]);
        res.json(classWithStudents[0] || {className, studentDetails: []});
    }catch{
        console.log(err)
        res.status(500).send({status: "Error fetching students ", error: err.message});
    }
})













module.exports = router;