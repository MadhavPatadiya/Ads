const express = require('express');
const usersRoute = express.Router();
const UsersController = require('../controllers/usersController');

const { roles,
    checkUserRole,} = require('../middleware/rolebased');

// Create a new user
usersRoute.post('/create_user',UsersController.createUser);
usersRoute.get('/users', UsersController.getAllUsers);

// Get user by ID route (GET)
usersRoute.get('/users/:id', UsersController.getUserById);

// Update user by ID route (PUT)
usersRoute.patch('/users/:id', UsersController.updateUserById);

// Delete user by ID route (DELETE)
usersRoute.delete('/users/:id', UsersController.deleteUserById);

// Get all users


usersRoute.post("/signIn", UsersController.signIn);

module.exports = usersRoute;