const { default: mongoose } = require('mongoose');
const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const studentSchema = new Schema ({
    studentId: {
        type: String,
        required: true
    },
    name: {
        type : String,
        required: true
    },
    age: {
        type : Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const teacherSchema = new Schema({
    teacherId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required:true
    },

    age: {
        type: Number,
        required: true

    },
    password: {
        type: String,
        required: true
    }
});


const courseSchema = new Schema({

    courseId:{
        type: String,
        required: true
    },

    courseName: {
        type: String,
        required: true
    },

    NoOfStudent: {
        type: Number,
        required: true

    },
    courseFee: {
        type: String,
        required: true
    },

    lectureName: {
        type: String,
        required: true
    },

    Duration: {
        type: String,
        required: true

    }
});

const assigmentSchema = new Schema({
    assignmentId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courseId:{
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },

    pdfFile:{
        type: String,
        required: true

    }    
});

const adminSchema = new Schema ({
    adminId:{
        type:String,
        required: true
    },
    adminName:{
        type: String,
        required:true
    },
    adminAge:{
        type: Number,
        required: true
    },

    adminGender:{
        type: String,
        required: true
    },

    adminPassword:{
        type: String,
        required: true
    }

    

});




const Student = mongoose.model("Student",studentSchema);
const Teacher = mongoose.model("Teacher",teacherSchema);
const Course = mongoose.model("Course",courseSchema);
const Assignment = mongoose.model("Assignment",assigmentSchema);
const Admin = mongoose.model("Admin",adminSchema);

module.exports = {
    Student,
    Teacher,
    Course,
    Assignment,
    Admin
}
   
