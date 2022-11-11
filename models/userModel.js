const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePicture: String,
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre("save", function (next) {
    let user = this;

    //Generate a unique SALT
    bcrypt.genSalt(10)
    .then(salt => {
        //Hash the password using the generated SALT
        bcrypt.hash(user.password, salt)
        .then(hashedPwd => {
            //Password was hashed.
            //Update the user model before we save it to the database
            user.password = hashedPwd;
            next();
        })
        .catch(err => {
            console.log(`Error occurred when hashing... ${error}`);
        })
    })
    .catch(err => {
        console.log(`Error occurred when salting... ${error}`);
    });
});

const userModel = mongoose.model("users", userSchema)

module.exports = userModel;