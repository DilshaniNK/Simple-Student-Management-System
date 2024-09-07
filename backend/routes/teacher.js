const router = require("express").Router();
const { Teacher } = require("../models/Scheam.js");
const bcrypt = require("bcryptjs"); // Import bcryptjs

// Add Teacher route with password hashing
router.route("/add").post(async (req, res) => {
  const { name, age, gender, password } = req.body;

  try {
    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ name });

    if (existingTeacher) {
      return res.status(400).send({ status: "Teacher already exists" });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new teacher with hashed password
    const newTeacher = new Teacher({
      name,
      age,
      gender,
      password: hashedPassword, // Store hashed password
    });

    await newTeacher.save();
    res.json("Teacher added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error adding teacher", error: err.message });
  }
});

// Login route with password verification
router.route("/login").post(async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find teacher by name
    const teacher = await Teacher.findOne({ name });

    if (!teacher) {
      return res.status(401).send({ status: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);

    if (isMatch) {
      res.status(200).send({ status: "Login successful", user: teacher });
    } else {
      res.status(401).send({ status: "Invalid credentials" });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send({ status: "Error logging in", error: err.message });
  }
});

// Update Teacher route with password hashing
router.route("/update").put(async (req, res) => {
  const { name, newUsername, newage, newpassword } = req.body;

  try {
    let hashedPassword = newpassword;

    // Hash the new password before updating if provided
    if (newpassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newpassword, salt);
    }

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { name },
      { name: newUsername, age: newage, password: hashedPassword },
      { new: true }
    );

    if (updatedTeacher) {
      res.status(200).send({ status: "Update successful", user: updatedTeacher });
    } else {
      res.status(404).send({ status: "Teacher not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error updating teacher", error: err.message });
  }
});

router.route("/delete").delete(async (req, res) => {
  const { name, password } = req.body;

  try {
    console.log('Received Name:', name);
    console.log('Received Password:', password);

    // Find the teacher by name
    const teacher = await Teacher.findOne({ name });

    if (!teacher) {
      return res.status(404).send({ status: "Teacher not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);

    console.log('Password Match:', isMatch); // Log password comparison result

    if (isMatch) {
      await Teacher.findOneAndDelete({ name });
      res.status(200).send({ status: "Teacher deleted" });
    } else {
      res.status(401).send({ status: "Invalid credentials" });
    }
  } catch (err) {
    console.log('Error:', err.message);
    res.status(500).send({ status: "Error deleting teacher", error: err.message });
  }
});

module.exports = router;
