const mongoose = require("mongoose");


const reelsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId:{
    type:String,
    required:true
  },
  video: {
    data:{type: Buffer,required:true}, // Store the video data as a Buffer
    contentType: String, // Store the content type of the video
  },
   
}, {
    timestamps: true
});
module.exports = mongoose.model("reels", reelsSchema);


module.exports = mongoose.model("reels", reelsSchema);
