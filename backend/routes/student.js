const router = require("express").Router();
const { Student } = require("../models/Scheam.js");
const bcrypt = require("bcrypt");

// Add student
router.route("/add").post(async (req, res) => {
    const { name, age, gender, password } = req.body;

    try {
        const existingStudent = await Student.findOne({ name });

        if (existingStudent) {
            return res.status(400).send({ status: "Error", message: "Student already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            name,
            age,
            gender,
            password: hashedPassword,
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
router.route("/update").put(async (req, res) => {
    const { name, newUsername, newAge, newPassword } = req.body;

    try {
        // Prepare the fields to update
        const updateFields = {
            name: newUsername || undefined,
            age: newAge || undefined,
        };

        // If newPassword is provided, hash it and include it in the update
        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            updateFields.password = hashedPassword;
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { name },
            updateFields,
            { new: true } // Return the updated student document
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
    const { name } = req.body;

    try {
        await Student.findOneAndDelete({ name });
        res.status(200).send({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting student", error: err.message });
    }
});

// Get student by name
router.route("/get/").get(async (req, res) => {
    const { name } = req.query;

    try {
        const student = await Student.findOne({ name });
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

        if (student && await bcrypt.compare(password, student.password)) {
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
