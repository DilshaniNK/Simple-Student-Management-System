const { default: mongoose } = require('mongoose');
const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const studentSchema = new Schema ({
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
    assigmentId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courseId: {
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




const Student = mongoose.model("Student",studentSchema);
const Teacher = mongoose.model("Teacher",teacherSchema);
const Course = mongoose.model("Course",courseSchema);
const Assigment = mongoose.model("Assigment",assigmentSchema);

module.exports = {
    Student,
    Teacher,
    Course,
    Assigment
}
   
