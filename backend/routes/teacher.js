const router = require("express").Router();
const { Teacher,Marks,Student } = require("../models/Scheam.js");
const bcrypt = require("bcryptjs"); // Import bcryptjs


// Add Teacher route with password hashing
// router.route("/add").post(async (req, res) => {
//   const { teacherId, name, age, gender, password } = req.body;

//   try {
//     // Check if teacher already exists
//     const existingTeacher = await Teacher.findOne({ teacherId });

//     if (existingTeacher) {
//       return res.status(400).send({ status: "Teacher already exists" });
//     }

//     // Hash the password before storing it
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new teacher with hashed password
//     const newTeacher = new Teacher({
//       teacherId,
//       name,
//       age,
//       gender,
//       password: hashedPassword, // Store hashed password
//     });

//     await newTeacher.save();
//     res.json("Teacher added successfully");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ status: "Error adding teacher", error: err.message });
//   }
// });

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
      res.status(200).send({ status: "Login successful", teacherId: teacher.teacherId, user: teacher });
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
  const { teacherId, name, newUsername, newage, newpassword } = req.body;

  try {
    let hashedPassword = newpassword;

    // Hash the new password before updating if provided
    if (newpassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newpassword, salt);
    }

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { teacherId },
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
  const { teacherId, password } = req.body;

  try {
    // console.log('Received Name:', name);
    // console.log('Received Password:', password);

    // Find the teacher by name
    const teacher = await Teacher.findOne({ teacherId });

    if (!teacher) {
      return res.status(404).send({ status: "Teacher not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);

    console.log('Password Match:', isMatch); // Log password comparison result

    if (isMatch) {
      await Teacher.findOneAndDelete({ teacherId });
      res.status(200).send({ status: "Teacher deleted" });
    } else {
      res.status(401).send({ status: "Invalid credentials" });
    }
  } catch (err) {
    console.log('Error:', err.message);
    res.status(500).send({ status: "Error deleting teacher", error: err.message });
  }
});

//methana idn hadanna marks add krna eka
router.post("/add-marks", async (req, res) => {
  const { subject, studentId, marks } = req.body;

  try {
    const newMark = new Marks({
      subject,
      studentId,
      marks,
    });

    await newMark.save();
    res.json({ message: "Marks Added Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error adding marks", error: err.message });
  }
});


router.post("/add-student", async (req, res) => {
  const { studentId, name, age, gender, password, class: studentClass } = req.body;

  try {
    const existingStudent = await Student.findOne({ studentId });

    if (existingStudent) {
      return res.status(400).send({ status: "Student already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      studentId,
      name,
      age,
      gender,
      password: hashedPassword,
      class: studentClass,
    });

    await newStudent.save();
    res.json({ status: "Student added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error adding student", error: err.message });
  }
});





router.put("/student/update/:studentId", async (req, res) => {
  const studentId = req.params.studentId; // Get studentId from URL params
  const { name, age, gender, class: studentClass, password } = req.body; // destructure update fields from body

  try {
    const updateData = {};

    if (name) updateData.name = name;
    if (age) updateData.age = age;
    if (gender) updateData.gender = gender;
    if (studentClass) updateData.class = studentClass;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { studentId },      // query filter
      { $set: updateData },  // update operation
      { new: true }       // return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ status: "Student not found" });
    }

    res.status(200).json({ status: "Student updated successfully", updatedStudent });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ status: "Error updating student", error: err.message });
  }
});



//get teachers assigend class
// routes/teacherRoutes.js
router.get("/assigned-class/:teacherId", async (req, res) => {
  const { teacherId } = req.params;

  try {
    const teacher = await Teacher.findOne({ teacherId });

    if (!teacher) {
      return res.status(404).send({ status: "Teacher not found" });
    }

    res.json({ status: "Success", assignedClass: teacher.assignedClass });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error retrieving class", error: err.message });
  }
});





















module.exports = router;
