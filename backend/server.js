const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser =  require("body-parser");
const app = express();
require("dotenv").config();
const path = require('path');

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected to MongoDB");

})
const studentRoute = require("./routes/student.js");
const teacherRoute = require("./routes/teacher.js");
const coursesRoute = require("./routes/courses.js");
const AssigmentRoute = require("./routes/assigments.js");
const AdminRouter = require("./routes/admin.js");

app.use("/student",studentRoute);//http://localhost:8070/student
app.use("/teacher",teacherRoute);//http://localhost:8070/teacher 
app.use("/course",coursesRoute);//http://localhost:8070/course
app.use("/assignment",AssigmentRoute);//http://localhost:8070/assigment
app.use("/admin",AdminRouter);//http://localhost:8070/admin

app.listen(PORT, () =>{
    console.log(`Server Runs on ${PORT} PORT `);

})


// Serve the uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
