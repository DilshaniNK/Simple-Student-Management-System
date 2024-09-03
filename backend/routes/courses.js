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
router.route.put("/update", async (req, res) => {
  const { courseId, newcourseId, newcourseName, newNoOfStudent, newcourseFee, newlectureName, newDuration } = req.body;

  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { courseId },
      { 
        courseId: newcourseId || courseId, // Update the courseId only if provided
        courseName: newcourseName,
        NoOfStudent: newNoOfStudent,
        courseFee: newcourseFee,
        lectureName: newlectureName,
        Duration: newDuration
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating course' });
  }
});




router.route.delete("/delete", async (req, res) => {
    const { courseId } = req.body;
  
    try {
      const result = await Course.findOneAndDelete({ courseId });
  
      if (!result) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting course' });
    }
  });

module.exports = router;