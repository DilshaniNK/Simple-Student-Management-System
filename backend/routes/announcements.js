const router = require("express").Router();
const { Announcement } = require("../models/Scheam.js");

// Add announcement
router.post("/add", async (req, res) => {
  try {
    const { title, description, date, teacherId } = req.body;
      console.log(teacherId , "jiii");
    // Validate required fields
    if (!title || !description || !date) {
      return res.status(400).json({ message: "Title, description and date are required" });
    }

    // Create new announcement
    const newAnnouncement = new Announcement({
      title,
      description,
        date,
        teacherId,
    });

    // Save to DB
    await newAnnouncement.save();

    return res.status(201).json({
      message: "Announcement added successfully",
      newAnnouncement,
    });
  } catch (error) {
    console.error("Error adding announcement:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    return res.status(200).json(announcements); // ✅ should be an array
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


// Delete announcement
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Announcement.findByIdAndDelete(id);
        res.json({ message: "Announcement deleted successfully" });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
