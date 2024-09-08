const express = require("express");
const router = express.Router();

// About route
router.get("/", (req, res) => {
    res.json({
        title: "About Us",
        description: "This is the About page of our web application, where we share information about the company or service."
    });
});

module.exports = router;
