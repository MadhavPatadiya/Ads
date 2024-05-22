const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');
const reels = require('./models/reelsModel');


const app = express();
const PORT = 6001;
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(

  "mongodb://15.206.62.195:27017/Ads",

  // 'mongodb+srv://vishalfuerte978:fGCW5IKQ8EDMm7ny@cluster0.kzf1h0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',


  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(async () => {
    console.log('Connection successful');
    // add your routes here
    app.get('/', (req, res) => {
      return res.render('homepage');
    });
  }).catch((err) => {
    console.error('Connection error:', err);
  });

const usersRoute = require("./routes/usersRoutes");
app.use("/api/userinfo", usersRoute);

const reelsRoute = require("./routes/reelsRoutes");
app.use("/api/reels", reelsRoute);





app.get('/video', async (req, res) => {
  try {
    const video = await reels.find().sort({ _id: -1 });
    res.render('video', { video: video });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching videos');
  }
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
