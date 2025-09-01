const router = require("express").Router();
const { Admin, User } = require("../models/Scheam.js");
const bcrypt = require("bcrypt");
const { Teacher } = require("../models/Scheam.js");  // Adjust path if needed
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const authMiddlware = require("../models/authMiddlware.js");



require("dotenv").config();
//------------------------multer setup for document store-------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/qualifications/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//--------------otp generator--------------
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// -------------------- Email Setup --------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
// Route to add teacher (only admin should access this)
router.post("/add-teacher", authMiddlware(['admin']) ,upload.single("qualifications"), async (req, res) => {
  try {
    // Check if teacher already exists in User
    const existingTeacher = await Teacher.findOne({ email: req.body.email });
    if (existingTeacher) {
      return res
        .status(400)
        .json({ message: "Teacher already exists with this email address" });
    }

    // Generate teacher ID
    const lastTeacher = await Teacher.findOne().sort({ teacherId: -1 });
    let newIdNumber = 1;
    if (lastTeacher && lastTeacher.teacherId) {
      const lastIdNum = parseInt(lastTeacher.teacherId.split("_")[1]);
      newIdNumber = lastIdNum + 1;
    }
    const teacherId = `TEC_${String(newIdNumber).padStart(3, "0")}`;

    // Generate OTP
    const otp = generateOTP();

    const qualificationsFilePath = req.file ? req.file.path : "";

    // Hash otp
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    // Save User first
    const newUser = new User({
      email: req.body.email,
      password: hashedOtp, // empty initially
      role: 'teacher',
      isFirstLoging: true, // ensure it matches your login flow
      
    });

    await newUser.save();

    // Save Teacher profile
    const newTeacher = new Teacher({
      ...req.body,
      teacherId,
      qualifications: qualificationsFilePath,
      otp: hashedOtp,
      isFirstLoging: true,
    });

    await newTeacher.save();


    const mailOptions = {
      from: "chalkboardsystem123@gmail.com",
      to: req.body.email,
      subject: "Your Login OTP",
      text: `Hello ${req.body.firstName}, \n\n Your OTP is: ${otp} \n You can log one time using this `
    };
    console.log("Sending OTP to:", req.body.email);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json({
      message: "Teacher added successfully and OTP sent to email",
      teacherId,
    });
  } catch (err) {
    console.error("Error adding teacher:", err);
    res
      .status(500)
      .send({ status: "Error adding teacher", error: err.message });
  }
});

// View all teachers
router.get("/teachers/view",authMiddlware(['admin']), async (req, res) => {
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
const { error } = require("console");

//register student 
router.post("/add-student" , authMiddlware(['admin']) , upload.single("qualifications"), async(req,res) =>{

  try{
    const count = await Student.countDocuments();
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student already exists with this email address" });
    }
    //generate student Id
    const lastStudent = await Student.findOne().sort({studentId: -1});
    let newIdNumber = 1;
    if(lastStudent && lastStudent.studentId){
      const lastIdNum = parseInt(lastStudent.studentId.split("_")[1]);
      newIdNumber = lastIdNum + 1
    }
    const studentId = `STU_${String(newIdNumber).padStart(3, "0")}`;
   
    const otp = generateOTP();
    //genarate index number

    const yearPrefix = new Date().getFullYear().toString().slice(-2);
    const indexNumber = `${yearPrefix}${String(count + 1).padStart(5, '0')}`;

    const qualificationsFilePath = req.file ? req.file.path : "";
      // Hash otp
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    // Save User first
    const newUser = new User({
      email: req.body.email,
      password: hashedOtp, // empty initially
      role: 'student',
      isFirstLoging: true, // ensure it matches your login flow
      
    });

    await newUser.save();

    const newStudent = new Student({
      ...req.body,
      studentId,
      indexNumber,
      qualifications: qualificationsFilePath
    })

    await newStudent.save();
        const mailOptions = {
      from: "chalkboardsystem123@gmail.com",
      to: req.body.email,
      subject: "Your Login OTP",
      text: `Hello ${req.body.firstName}, \n\n Your OTP is: ${otp} \n You can log one time using this  \n This is Your index number : ${indexNumber}`
    };
    console.log("Sending OTP to:", req.body.email);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res
    res.json({status: `Student Register Sucessfull and This is Student Index Number :  ${indexNumber}`})
  }
  catch(err){
    res.status(500).send({status: "Error registering student ", error: err.message});

  }
});



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
