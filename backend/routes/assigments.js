const router = require("express").Router();
const { Assignment } = require("../models/Scheam.js");
const multer = require("multer");

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.route("/add").post(upload.single('file'), async (req, res) => {
    
    try {
        const newAssignment = new Assignment({
            assignmentId: req.body.assignmentId,
            description: req.body.description,
            dueDate: req.body.dueDate,
            pdfFile: req.file ? req.file.path : null,
            courseId: req.body.courseId,
        });

        await newAssignment.save();
        res.status(200).json({ message: "Assignment added successfully!" });
    } catch (error) {
        console.log(error); // Log detailed error
        res.status(500).json({ message: "Error adding assignment", error });
    }
});



router.route("/get").get(async(req,res)=>{
    const { assignmentId } = req.body;
    try{
        const assigment = await Assignment.findOne({assignmentId});
        if(!assigment){
            return res.status(404).json({messag: " Assigment not found"});

        }
        res.status(200).json(assigment);
        
    }catch(error){
        res.status(500).json({message: "Error retrieving assigment",error});
    }

});

router.route("/update").put(upload.single('file'), async (req, res) => {
    try {
        const updateData = {
            assignmentId: req.body.assignmentId,
            description: req.body.description,
            dueDate: req.body.dueDate,
            pdfFile: req.file ? req.file.path : req.body.existingFilePath,
            courseId: req.body.courseId
        };

        const updatedAssignment = await Assignment.findOneAndUpdate(
            { assignmentId: req.body.assignmentId },
            updateData,
            { new: true }
        );

        if (!updatedAssignment) {
            return res.status(400).json({ message: "Assignment not found" });
        }

        res.status(200).json({ message: "Assignment updated successfully!", updatedAssignment });
    } catch (error) {  // Capture the error here
        res.status(500).json({ message: "Error updating assignment", error: error.message });
    }
});





module.exports = router;
