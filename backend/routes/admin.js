const router = require("express").Router();
const { Admin } = require("../models/Scheam.js");
const bcrypt = require("bcrypt");
const { Teacher } = require("../models/Scheam.js");  // Adjust path if needed


// Add Admin
router.route("/add").post(async (req, res) => {
    const { adminId, adminName, adminAge, adminGender, adminPassword } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ adminName });

        if (existingAdmin) {
            return res.status(400).send({ status: "Error", message: "Admin already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        const newAdmin = new Admin({
            adminId,
            adminName,
            adminAge,
            adminGender,
            adminPassword: hashedPassword, // Store hashed password
        });

        await newAdmin.save();
        res.json("Admin Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding admin", error: err.message });
    }
});

// View admins
router.route("/").get(async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching admins", error: err.message });
    }
});

// Update admin
router.route("/update").put(async (req, res) => {
    const { adminId, newadminName, newadminAge, newadminPassword } = req.body;

    try {
        let hashedPassword = newadminPassword;
        // Hash the new password
        if(newadminPassword){
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(newadminPassword, salt);
        }
        const updatedAdmin = await Admin.findOneAndUpdate(
            { adminId },
            { adminName: newadminName, adminAge: newadminAge, adminPassword: hashedPassword },
            { new: true }
        );

        if (updatedAdmin) {
            res.status(200).send({ status: "Update successful", user: updatedAdmin });
        } else {
            res.status(404).send({ status: "Admin not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating admin", error: err.message });
    }
});

// Delete Admin
router.route("/delete").delete(async (req, res) => {
    const { adminId } = req.body;

    try {
        await Admin.findOneAndDelete({ adminId });
        res.status(200).send({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting admin", error: err.message });
    }
});

// Get admin by ID
router.route("/get/").get(async (req, res) => {
    const { adminId } = req.query;

    try {
        const admin = await Admin.findOne({ adminId });
        res.status(200).send({ status: "User fetched", user: admin });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching admin", error: err.message });
    }
});

// Login Admin
router.route("/login").post(async (req, res) => {
    const { adminName, adminPassword } = req.body;

    try {
        // Find admin by name
        const admin = await Admin.findOne({ adminName });

        if (admin && await bcrypt.compare(adminPassword, admin.adminPassword)) { // Compare hashed passwords
            res.status(200).send({ status: "Login successful", adminId: admin.adminId });
        } else {
            res.status(401).send({ status: "Invalid credentials" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ status: "Error logging in", error: err.message });
    }
});



// Route to add teacher (only admin should access this)
router.post("/add-teacher", async (req, res) => {
  const { teacherId, name, age, gender, assignedClass,password } = req.body;

  try {
    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ teacherId });
    if (existingTeacher) {
  
    return res.status(400).send({ status: "Teacher already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save teacher
    const newTeacher = new Teacher({
      teacherId,
      name,
      age,
      gender,
      assignedClass,
      password: hashedPassword,
    
    });

    await newTeacher.save();
    res.json({ status: "Teacher added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error adding teacher", error: err.message });
  }
});


// View all teachers
router.get("/teachers/view", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error fetching teachers", error: err.message });
  }
});


router.put("/teachers/update", async (req, res) => {
  const { teacherId, newName, newAge, newGender, newPassword } = req.body;

  try {
    let hashedPassword = newPassword;
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { teacherId },
      { 
        name: newName, 
        age: newAge, 
        gender: newGender,
        ...(newPassword && { password: hashedPassword })
      },
      { new: true }
    );

    if (updatedTeacher) {
      res.status(200).send({ status: "Teacher updated successfully", teacher: updatedTeacher });
    } else {
      res.status(404).send({ status: "Teacher not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error updating teacher", error: err.message });
  }
});


router.delete("/teachers/delete", async (req, res) => {
  const { teacherId } = req.body;

  try {
    await Teacher.findOneAndDelete({ teacherId });
    res.status(200).send({ status: "Teacher deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error deleting teacher", error: err.message });
  }
});


// In your admin routes
const { Student } = require("../models/Scheam");

// Get total counts
// For teachers
router.get("/teacher/count", async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// For students
router.get("/student/count", async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
