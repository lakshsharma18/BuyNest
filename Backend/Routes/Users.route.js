import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";

// collection import
import User from "../models/User.js";

// signup
router.post("/signup", async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        // checking if user already exists or not
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // if new user
        const hashPassword = await bcrypt.hash(password, 10);

        // creating and saving new user 
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword
        });

        // saving inside database
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully!",
            user: {
                _id: createdUser._id,
                email: createdUser.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

});

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // finding user using email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
          }
        // finding user using password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(201).json({
                message: "Login successfull",
                user: {
                    _id: user._id,
                    email: user.email
                }
            });
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    };
});

export default router;
