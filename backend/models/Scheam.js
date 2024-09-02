const { default: mongoose } = require('mongoose');
const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const studentSchema = new Schema ({
    name: {
        type : String,
        require: true
    },
    age: {
        type : Number,
        require: true
    },

    gender: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const teacherSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require:true
    },

    age: {
        type: Number,
        require: true

    },
    password: {
        type: String,
        require: true
    }
});


const courseSchema = new Schema({

    courseId:{
        type: String,
        require: true
    },

    courseName: {
        type: String,
        require: true
    },

    NoOfStudent: {
        type: Number

    },
    courseFee: {
        type: String,
        require: true
    },

    lectureName: {
        type: String,
        require: true
    },

    Duration: {
        type: String,

    }
});





const Student = mongoose.model("Student",studentSchema);
const Teacher = mongoose.model("Teacher",teacherSchema);
const Course = mongoose.model("Course",courseSchema);

module.exports = {
    Student,
    Teacher,
    Course
}
   
