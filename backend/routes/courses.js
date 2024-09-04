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
        const course = await Course.find();
        res.json(course);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching courses", error: err.message });
    }
});


// Update course details
router.route("/update").put(async (req, res) => {
  const { courseId, newcoursename,newNoofstudents,newcoursefee,newlecturename,newduration } = req.body;

  try {
      const updatedCourse = await Course.findOneAndUpdate(
          { courseId },
          { courseName: newcoursename, NoOfStudent: newNoofstudents,courseFee:newcoursefee,lectureName:newlecturename,Duration:newduration},
          { new: true }
      );

      if (updatedCourse) {
          res.status(200).send({ status: "Update successful", user: updatedCourse });
      } else {
          res.status(404).send({ status: "course not found" });
      }
  } catch (err) {
      console.log(err);
      res.status(500).send({ status: "Error updating course", error: err.message });
  }
});





// Delete course
router.route("/delete").delete(async (req, res) => {
    const {  courseId } = req.body;

    try {
        await Course.findOneAndDelete({courseId});
        res.status(200).send({ status: "Course deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting courses", error: err.message });
    }
});

module.exports = router;