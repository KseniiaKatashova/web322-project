const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const express = require("express");
const router = express.Router();


//(GET) User registration page
router.get("/sign-up", (req, res) => {
    res.render("user/signup", {
        title: "Sign Up"
    });
});





//(POST) User registration page
router.post("/sign-up", (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    let passedValidation = true;
    let validationMessages = {};

    if (typeof firstName !== "string"  || firstName.trim().length == 0) {
        //first name is not a string or is an empty string
        passedValidation = false;
        validationMessages.firstName = "Please enter your first name";
    }
    else if (typeof firstName !== "string"  || firstName.trim().length < 2) {
        //first name is not a string or is only a single character 
        passedValidation = false;
        validationMessages.firstName = "First name must contain at least 2 characters long";
    }

    if (typeof lastName !== "string"  || lastName.trim().length == 0) {
        //last name is not a string or is an empty string
        passedValidation = false;
        validationMessages.lastName = "Please enter your last name";
    }


    // check email 
    var regExpEmail = /\S+@\S+\.\S+/;

    if (email.trim().length == 0) {
        //email is not an empty
        passedValidation = false;
        validationMessages.email = "Please enter email address";
    }
    else if(!regExpEmail.test(email)) {
        passedValidation=false;
        validationMessages.email = "Please emter valid email address";
    }
    
    
    //check PASSWORD
    var minNumOfChar = 8;
    var maxNumOfChar = 12;
    var regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;

    if(password.trim().length == 0){
        passedValidation = false;
        validationMessages.password = "Please enter your password";
    }
    else if(password.length < minNumOfChar || password.length > maxNumOfChar){
        passedValidation = false;
        validationMessages.password = "Password should be between 8 and 12 characters";
    }
    else if(!regExp.test(password)){
        passedValidation = false;
        validationMessages.password = "Password should contain atleast one number, special character, lowercase and uppercase letter";
    }



    // VALIDATION OF ALL CRITERIAS

    if(passedValidation) {
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: email,
            from: "kseniiakatashova@gmail.com", //from: "kkatashova@myseneca.ca", 
            subject: "Contact Us form Submission",
            html: 
                `Welcome on our team, ${firstName}!<br>
                Thanks for signing up with "Cool Beans"!<br><br>
                Here your account details:<br>
                Name: ${firstName} ${lastName}<br>
                Email: ${email}<br><br>
                
                Regards,<br><br>
                Kseniia Katashova<br>
                Executive Manager <br>
                cell: +685 086 6556<br>
                kkatashova@myseneca.ca
                `,
        };

        sgMail
            .send(msg)
            //then create a user account in the database
            .then(() => {
                //Updates for Assignment 4
                const user = new userModel({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                });

                user.save()
                    .then(userSaved => {
                        console.log(`User ${userSaved.firstName} has been added to the database.`);
                        
                    })
                    .catch(err => {
                        console.log(`Error adding user to the database...${err}`);
                    
                    });
                })
            .then(() => {
            // res.send("Success, validation passed and email has been sent.");    
                 res.redirect("/welcome");
            })
            .catch((err) => {
                 console.log(err);

                res.render("user/signup", { 
                     title: "Sign-up",
                    values: req.body,
                    validationMessages
                });
            });
        }
        else {
            res.render("user/signup", {
                title: "Sign-up",
                values: req.body,
                validationMessages
            });
}});


//(GET) Route to a registration page
router.get("/log-in", (req, res) => {
    res.render("user/login", {
        title: "Login Page"
    });
});

//(POST) Route to a registration page
router.post("/log-in", (req, res) => {

    const { email, password } = req.body;

    let passedValidation = true;
    let validationMessages = {};

    if ( email.trim().length == 0  && password.trim().length == 0) {
        //both email and password are empty
        passedValidation = false;
        validationMessages.email = "Please enter your email address";
        validationMessages.password = "Please enter the password";
    }
    else if (typeof email !== "string"  || email.trim().length == 0) {
        //email is not a string or is an empty string
        passedValidation = false;
        validationMessages.email = "Please enter your email address";
    }
    else if ( typeof password !== "string" || password.trim().length ==0) {
        //check password
        passedValidation = false;
        validationMessages.password = "Please enter the password";
    }
  
     

    if (passedValidation) {
        //    res.send("Passed Validation");

        // Updated for the Assignment 4
         let errors = [];

         //Search MongoDB for the matching document (base on email address)
         userModel.findOne({
            email: req.body.email
         })
         .then(user => {
            //Completed the search
            if(user){
                //Found the user document
                //Compare the password submitted to the password in the document
                bcrypt.compare(req.body.password, user.password)
                .then(isMatched => {
                    //Done comparing password

                    if(isMatched){
                        //Password match
                         
                        res.redirect("/");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Update route to the  dashboard!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    }
                    else{
                        //Password are different
                        errors.push("Password does not match the database.");
                        console.log(errors[0]);
        
                        res.render("user/login", {
                            errors
                        });
                    }
                })
            }
            else{
                //User was not found
                errors.push("Email was not found in the database.");
                console.log(errors[0]);

                res.render("user/login", {
                    errors
                });
            }
         })
         .catch(err => {
            //Couldn't query the database
            errors.push("Error finding the user in the database..." + err);
             console.log(errors[0]);

             res.render("user/login", {
                errors
             });
         });






    }
    else {
        res.render("user/login", {
            title: "Login Page",
            values: req.body,
            validationMessages
        });
}});







module.exports = router;