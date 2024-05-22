const UsersInfo = require('../models/usersModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersController = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const { emailId, password, isActive,userName } = req.body;
           
            const user = new UsersInfo({
                emailId,
                password,
                isActive,
                userName,

            });

            await user.save();
            res.status(201).json({ message: 'User created successfully',data:user  });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    signIn: async function (req, res) {
        try {
            const { emailId, password } = req.body;
            const foundUser = await UsersInfo.findOne({ emailId: emailId });
            if (!foundUser) {
                return res.json({ success: false, message: "User not found!" });
            }
            const passwordMatch = bcrypt.compareSync(password, foundUser.password);
            if (!passwordMatch) {
                return res.json({ success: false, message: "Incorrect password!" });
            }

            // Generate JWT token with user's ID and role
            const token = jwt.sign({ userId: foundUser.id}, "your-secret-key", {
                expiresIn: "5h",
            });

            console.log(token);

            return res.json({ success: true, data: foundUser, token: token });
        } catch (ex) {
            return res.json({ success: false, message: "error" });
        }
    },
    
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await UsersInfo.find();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get user by ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UsersInfo.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update user by ID
    updateUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedUser = await UsersInfo.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully', data: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete user by ID
    deleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await UsersInfo.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
        
}

module.exports = UsersController;