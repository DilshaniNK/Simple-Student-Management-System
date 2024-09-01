const router = require("express").Router();
const {Student} = require("../models/Scheam.js");

// Add student
router.route("/add").post(async (req, res) => {
    const { name, age, gender, password } = req.body;

    try {
        const newStudent = new Student({
            name,
            age,
            gender,
            password // Store password as plain text (not recommended for production)
        });

        await newStudent.save();
        res.json("Student Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding student", error: err.message });
    }
});

// View students
router.route("/").get(async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching students", error: err.message });
    }
});

// Update student
// Update student
router.route("/updateprofile").put(async (req, res) => {
    const { name, newUsername, newage, newpassword } = req.body;

    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { name },
            { name: newUsername, age: newage, password: newpassword},
            { new: true }
        );

        if (updatedStudent) {
            res.status(200).send({ status: "Update successful", user: updatedStudent });
        } else {
            res.status(404).send({ status: "Student not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating student", error: err.message });
    }
});

// Delete student
router.route("/delete").delete(async (req, res) => {
    const {  name , password } = req.body;

    try {
        await Student.findOneAndDelete({name});
        res.status(200).send({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting student", error: err.message });
    }
});

// Get student by ID
router.route("/get/").get(async (req, res) => {
    const {name} = req.body;

    try {
        const student = await Student.findOne({name});
        res.status(200).send({ status: "User fetched", user: student });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching student", error: err.message });
    }
});

// Login student
router.route("/login").post(async (req, res) => {
    const { name, password } = req.body;

    try {
        // Find student by name
        const student = await Student.findOne({ name });

        if (student && student.password === password) { // Check password as plain text
            res.status(200).send({ status: "Login successful", user: student });
        } else {
            res.status(401).send({ status: "Invalid credentials" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ status: "Error logging in", error: err.message });
    }
});

module.exports = router;
