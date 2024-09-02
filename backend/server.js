const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser =  require("body-parser");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyparser.json());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Database connected!");

})
const studentRoute = require("./routes/student.js");
const teacherRoute = require("./routes/teacher.js");
const coursesRoute = require("./routes/courses.js");

app.use("/student",studentRoute);//http://localhost:8070/student
app.use("/teacher",teacherRoute);//http://localhost:8070/teacher 
app.use("/course",coursesRoute);//http://localhost:8070/course

app.listen(PORT, () =>{
    console.log(`Server run on Port: ${PORT}`);

})
