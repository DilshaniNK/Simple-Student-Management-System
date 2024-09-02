const router = require("express").Router();
const { Course } = require("../models/Scheam.js");


router.route("/add").post(async (req, res) => {
    const {   courseId , courseName , NoOfStudent , courseFee , lectureName , Duration } = req.body;

    try {
        const existingCourse = await Course.findOne({courseId});

        if (existingCourse){
            return res.status(400).send(({status: "Error"}));
        }
        const newCourse = new Course({
            courseId,
            courseName, 
            NoOfStudent,
            courseFee, 
            lectureName,
            Duration
        });

        await newCourse.save();
        res.json("Course Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding student", error: err.message });
    }
});

//view
router.route("/view").get(async (req, res) => {
    try {
        const Course = await Course.find();
        res.json(courses);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching courses", error: err.message });
    }
});

// Update courses
router.route("/update").put(async (req, res) => {
    const { courseId, newcourseId, newcourseName, newNoOfStudent, newcourseFee, newlectureName, newDuration } = req.body;

    try {
        const updateCourses = await Course.findOneAndUpdate(
            { courseId },
            { courseId: newcourseId, courseName: newcourseName, NoOfStudent: newNoOfStudent, courseFee: newcourseFee, Duration: newDuration},
            { new: true }
        );

        if (updatedStudent) {
            res.status(200).send({ status: "Update successful", user: updatedStudent });
        } else {
            res.status(404).send({ status: "Course not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating course", error: err.message });
    }
});


// Delete student
router.route("/delete").delete(async (req, res) => {
    const {  courseId } = req.body;

    try {
        await Course.findOneAndDelete({courseId});
        res.status(200).send({ status: "Course deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting course", error: err.message });
    }
});



module.exports = router;