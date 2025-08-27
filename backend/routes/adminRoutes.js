const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users (admin only)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route POST /api/admin/users
// @desc Add a new user (admin only)
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }

        user = await User.create({
            name: name,
            email: email,
            password: password,
            role: role || "customer",
        });

        await user.save();
        res.status(201).json({ message: "User created succesfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route PUT /api/admin/users/:id
// @desc Update user info (admin only)
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(400).json({ message: "No user found" })
        } else {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;

            const updatedUser = await user.save();
            return res.status(200).json({ message: "User updated succesfully", user: updatedUser });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route DELETE /api/admin/users/:id
// @desc Deletes a user (admin only)
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(400).json({ message: "No user found" })
        }

        return res.status(200).json({ message: "User deleted succesfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;