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






const Student = mongoose.model("Student",studentSchema);
const Teacher = mongoose.model("Teacher",teacherSchema);


module.exports = {
    Student,
    Teacher
}
   
