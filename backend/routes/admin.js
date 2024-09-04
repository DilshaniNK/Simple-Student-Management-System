const router = require("express").Router();
const {Admin} = require("../models/Scheam.js");

// Add Admin
router.route("/add").post(async (req, res) => {
    const { adminId, adminName, adminAge, adminGender,adminPassword } = req.body;

    try {
        const existingAdmin = await Admin.findOne({adminPassword});

        if (existingAdmin){
            return res.status(400).send(({status: "Error"}));
        }
        const newAdmin = new Admin({
            adminId,
            adminName,
            adminAge,
            adminGender,
            adminPassword // Store password as plain text (not recommended for production)
        });

        await newAdmin.save();
        res.json("Admin Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding admin", error: err.message });
    }
});

// View admin
router.route("/").get(async (req, res) => {
    try {
        const Admin = await Admin.find();
        res.json(Admin);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching Admin", error: err.message });
    }
});

// Update admin
router.route("/update").put(async (req, res) => {
    const { adminId, newadminName, newadminAge, newadminPassword} = req.body;

    try {
        const updatedAdmin = await Admin.findOneAndUpdate(
            { adminId },
            { adminName: newadminName, adminAge: newadminAge, adminPassword: newadminPassword},
            { new: true }
        );

        if (updatedAdmin) {
            res.status(200).send({ status: "Update successful", user: updatedAdmin });
        } else {
            res.status(404).send({ status: "Admin not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating Admin", error: err.message });
    }
});

// Delete Admin
router.route("/delete").delete(async (req, res) => {
    const {  adminId} = req.body;

    try {
        await Admin.findOneAndDelete({adminId});
        res.status(200).send({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting admin", error: err.message });
    }
});

// Get admin by ID
router.route("/get/").get(async (req, res) => {
    const {adminId} = req.body;

    try {
        const admin = await Admin.findOne({adminId});
        res.status(200).send({ status: "User fetched", user: admin });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching admin", error: err.message });
    }
});

// Login Admin
router.route("/login").post(async (req, res) => {
    const { adminName, adminPassword } = req.body;

    try {
        // Find student by name
        const admin = await Admin.findOne({adminName,adminPassword });

        if (admin && admin.adminPassword === adminPassword) { // Check password as plain text
            res.status(200).send({ status: "Login successful", user: admin });
        } else {
            res.status(401).send({ status: "Invalid credentials" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ status: "Error logging in", error: err.message });
    }
});

module.exports = router;
