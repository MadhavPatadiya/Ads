const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserInfoSchema = new mongoose.Schema({
    emailId: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    userName:{
        type:String,
        required:true
    }

}, {
    timestamps: true
});

// Hashing the password before saving
UserInfoSchema.pre('save', function (next) {
    const user = this;

    // If password is not modified, move to the next middleware
    if (!user.isModified('password')) return next();

    // Generate a salt and hash the password
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


module.exports = mongoose.model("Users", UserInfoSchema);
