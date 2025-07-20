const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Student Schema
const studentSchema = new Schema({
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
      class: {type:String},

    password: { type: String, required: true }
});

// Teacher Schema
const teacherSchema = new Schema({
  teacherId: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  assignedClass: { type: String, required: true }, // New field
});


// Course Schema
const courseSchema = new Schema({
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    NoOfStudent: { type: Number, required: true },
    courseFee: { type: String, required: true },
    lectureName: { type: String, required: true },
    Duration: { type: String, required: true }
});

// Assignment Schema
const assignmentSchema = new Schema({
    assignmentId: { type: String, required: true },
    description: { type: String, required: true },
    courseId: { type: String, required: true },
    dueDate: { type: Date, required: true },
    pdfFile: { type: String, required: true }
});

// Admin Schema
const adminSchema = new Schema({
    adminId: { type: String, required: true },
    adminName: { type: String, required: true },
    adminAge: { type: Number, required: true },
    adminGender: { type: String, required: true },
    adminPassword: { type: String, required: true }
});

// Marks Schema (✅ Added)
const marksSchema = new Schema({
    subject: { type: String, required: true },
    studentId: { type: String, required: true },
    marks: { type: Number, required: true }
});

// Models
const Student = mongoose.model("Student", studentSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Course = mongoose.model("Course", courseSchema);
const Assignment = mongoose.model("Assignment", assignmentSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Marks = mongoose.model("Marks", marksSchema);  // ✅ Added Marks Model

module.exports = {
    Student,
    Teacher,
    Course,
    Assignment,
    Admin,
    Marks  // ✅ Exported Marks
};
