const reels = require('../models/reelsModel');

const reelsController = {
    uploadVideo:async (req, res) => {
        try {
            if (!req.user || !req.user.userId) {
                throw new Error('User ID not found in request.');
            }
    
            const userId = req.user.userId;
            const { originalname, buffer, mimetype } = req.file;
    
            // Define an array of allowed video MIME types
            const allowedVideoMimeTypes = ['video/mp4', 'video/avi', 'video/mpeg'];
    
            // Check if the file is one of the allowed video formats
            if (!allowedVideoMimeTypes.includes(mimetype)) {
                throw new Error('Only MP4, AVI, and MPEG video files are allowed.');
            }
    
            const video = new reels({
                title: originalname,
                userId,
                video: {
                    data: buffer,
                    contentType: mimetype,
                },
            });
            await video.save();
            res.status(200).send('File uploaded successfully.');
        } catch (err) {
            console.error('Error uploading file:', err);
            res.status(500).send('Error uploading file: ' + err.message);
        }
    },

      getVideos:async (req, res) =>{
        try {
            // Retrieve videos from your database or wherever they are stored
            const videos = await reels.find();
    
            // Pass the videos to the EJS template when rendering
            res.status(400).json(videos);
        } catch (error) {
            console.error('Error fetching videos:', error);
            res.status(500).send('Error fetching videos');
        }
    },
    getVideoById: async (req, res) => {
      try {
          const { id } = req.params;
          const video = await reels.findById(id);
          if (!video) {
              return res.status(404).json({ message: 'Video not found' });
          }
          res.status(200).json(video);
      } catch (error) {
          console.error('Error fetching video by ID:', error);
          res.status(500).json({ error: 'Error fetching video by ID' });
      }
  },

  updateVideo: async (req, res) => {
      try {
        if (!req.user || !req.user.userId) {
            throw new Error('User ID not found in request.');
        }
          const { id } = req.params;
          const { title, userId, buffer, mimetype } = req.body;
          const allowedVideoMimeTypes = ['video/mp4', 'video/avi', 'video/mpeg'];
    
            // Check if the file is one of the allowed video formats
            if (!allowedVideoMimeTypes.includes(mimetype)) {
                throw new Error('Only MP4, AVI, and MPEG video files are allowed.');
            }
          const updatedVideo = await reels.findByIdAndUpdate(
              id,
              {
                  title,
                  userId,
                  video: {
                      data: buffer,
                      contentType: mimetype,
                  },
              },
              { new: true }
          );
          if (!updatedVideo) {
              return res.status(404).json({ message: 'Video not found' });
          }
          res.status(200).json({ message: 'Video updated successfully', video: updatedVideo });
      } catch (error) {
          console.error('Error updating video:', error);
          res.status(500).json({ error: 'Error updating video: ' + error.message });
      }
  },

  deleteVideo: async (req, res) => {
      try {
          const { id } = req.params;
          const deletedVideo = await reels.findByIdAndDelete(id);
          if (!deletedVideo) {
              return res.status(404).json({ message: 'Video not found' });
          }
          res.status(200).json({ message: 'Video deleted successfully', video: deletedVideo });
      } catch (error) {
          console.error('Error deleting video:', error);
          res.status(500).json({ error: 'Error deleting video: ' + error.message });
      }
  },
};


module.exports = reelsController;
