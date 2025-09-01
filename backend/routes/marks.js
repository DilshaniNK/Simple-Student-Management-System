const router = require("express").Router();
const { Teacher,Marks,Student } = require("../models/Scheam.js");

// Add or update marks for multiple students
router.post("/add-marks", async (req, res) => {
    console.log(req.body);

    try {
        const { year, term, subject, marksData } = req.body;

        if (!year || !term || !subject || !marksData || !marksData.length) {
            return res.status(400).json({ message: "Incomplete data" });
        }

        for (const item of marksData) {
            // Update if marks exist, otherwise create
            await Marks.findOneAndUpdate(
                { studentId: item.studentId, year, term, subject },
                { marks: item.marks },
                { upsert: true, new: true }
            );
        }

        return res.status(201).json({ message: "Marks added/updated successfully" });
    } catch (error) {
        console.error("Error adding marks:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Get marks for a student
router.get("/student/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const marks = await Marks.find({ studentId });
        res.json({ marks });
    } catch (error) {
        console.error("Error fetching marks:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
