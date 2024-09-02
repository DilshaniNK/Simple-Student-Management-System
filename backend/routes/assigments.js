const router = require("express").Router();
const multer = require("multer");
// const { model } = require("mongoose");
const { Assigment } = require("../models/Scheam.js");


//Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()} ${file.originalname}`)
    }
})

const upload = multer({storage:storage})

router.route("/add").post(async(req,res) => {

});

model.exports = router;