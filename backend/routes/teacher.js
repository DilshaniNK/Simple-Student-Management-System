const router = require("express").Router();
const {Teacher} = require("../models/Scheam.js");

router.route("/addteacher").post(async (req, res) => {
    const { name, age, gender, password } = req.body;

    try {
        const newTeacher = new Teacher({
            name,
            age,
            gender,
            password // Store password as plain text (not recommended for production)
        });

        await newTeacher.save();
        res.json("Teacher Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding teacher", error: err.message });
    }
});


router.route("/teacherlogin").post(async (req, res) => {
    const { name, password } = req.body;

    try {
        // Find student by name
        const teacher = await Teacher.findOne({ name });

        if (teacher && teacher.password === password) { // Check password as plain text
            res.status(200).send({ status: "Login successful", user: teacher });
        } else {
            res.status(401).send({ status: "Invalid credentials" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ status: "Error logging in", error: err.message });
    }
});
//Update Teacher
router.route("/updateteacher").put(async (req, res) => {
    const { name, newUsername, newage, newpassword } = req.body;

    try {
        const updatedTeacher = await Teacher.findOneAndUpdate(
            { name },
            { name: newUsername, age: newage, password: newpassword},
            { new: true }
        );

        if (updatedTeacher) {
            res.status(200).send({ status: "Update successful", user: updatedTeacher });
        } else {
            res.status(404).send({ status: "Teacher not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating student", error: err.message });
    }
});

router.route("/deleteteacher").delete(async (req, res) => {
    const {  name , password } = req.body;

    try {
        await Teacher.findOneAndDelete({name});
        res.status(200).send({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting teacher", error: err.message });
    }
});

module.exports = router;