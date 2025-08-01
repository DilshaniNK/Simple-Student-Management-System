const router = require("express").Router();
const { Admin } = require("../models/Scheam.js");
const bcrypt = require("bcrypt");
const { Teacher } = require("../models/Scheam.js");  // Adjust path if needed
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
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
router.post("/add-teacher", upload.single("qualifications") ,async (req, res) => {
  

  try {
    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email: req.body.email });
    if (existingTeacher) {
  
    return res.status(400).json({status: "Teacher alredy exists with this email address"});
    }
    //gererate teacher ID
    const lastTeacher = await Teacher.findOne().sort({teacherId: -1});
    let newIdNumber = 1;
    if(lastTeacher && lastTeacher.teacherId){
      const lastIdNum = parseInt(lastTeacher.teacherId.split("_")[1]);
      newIdNumber = lastIdNum + 1
    }
    const teacherId = `TEC_${String(newIdNumber).padStart(3, "0")}`;

    //generate otp
    const otp = generateOTP();

    const qualificationsFilePath = req.file ? req.file.path : "";

    // Hash otp
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    // Create and save teacher
    const newTeacher = new Teacher({
      ...req.body,
      teacherId,
      qualifications: qualificationsFilePath,
      otp: hashedOtp,
      isFirstLoging: true,
    
    });

    await newTeacher.save();

    const mailOptions = {
      from: 'dilnadeesha1232001@gmail.com',
      to: req.body.email,
      subject: "Your Login OTP",
      text: `Hello ${req.body.firstName}, \n\n Your OTP is: ${otp} \n You can log one time using this `
    };

    await transporter.sendMail(mailOptions);

    res.json({ status: "Teacher added successfully and OTP send to email",teacherId
      
     });
  } catch (err) {
    console.error("Error saving student:", err);
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
const { error } = require("console");

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

//register student 
router.post("/add-student" , upload.single("qualifications"), async(req,res) =>{

  try{
    const count = await Student.countDocuments();
    //generate student Id
    const lastStudent = await Student.findOne().sort({studentId: -1});
    let newIdNumber = 1;
    if(lastStudent && lastStudent.studentId){
      const lastIdNum = parseInt(lastStudent.studentId.split("_")[1]);
      newIdNumber = lastIdNum + 1
    }
    const studentId = `STU_${String(newIdNumber).padStart(3, "0")}`;

    //genarate index number

    const yearPrefix = new Date().getFullYear().toString().slice(-2);
    const indexNumber = `${yearPrefix}${String(count + 1).padStart(5, '0')}`;

    const qualificationsFilePath = req.file ? req.file.path : "";

    const newStudent = new Student({
      ...req.body,
      studentId,
      indexNumber,
      qualifications: qualificationsFilePath
    })

    await newStudent.save();
    res.json({status: `Student Register Sucessfull and This is Student Index Number :  ${indexNumber}`})
  }
  catch(err){
    res.status(500).send({status: "Error registering student ", error: err.message});

  }
});





module.exports = router;
