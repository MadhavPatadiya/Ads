const express = require('express');
const reelsRoute = express.Router();
const reelsController = require('../controllers/reelsController');
const multer = require('multer');
const verifyToken = require("../middleware/verifyToken");
const upload = multer();


// Create a new user
reelsRoute.post('/upload',upload.single('video'),verifyToken, reelsController.uploadVideo);
reelsRoute.get('/video', reelsController.getVideos);

reelsRoute.get('/video/:id', verifyToken, reelsController.getVideoById);

// Update video route (PUT)
reelsRoute.patch('/video/:id', verifyToken, reelsController.updateVideo);

// Delete video route (DELETE)
reelsRoute.delete('/video/:id', verifyToken, reelsController.deleteVideo);

// Get all users


// reelsRoute.post("/signIn", UsersController.signIn);

module.exports = reelsRoute;