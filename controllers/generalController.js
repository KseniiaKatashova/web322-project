const { application } = require("express");
const express = require("express");
const router = express.Router();
const mealkitList = require("../models/mealkit-db");

//Add your routs here
//e.g. app.get() (...)
router.get("/", (req, res) => {
    res.render("general/home", {
        title: "Home Page",
        mealKits: mealkitList.getTopMealkits()
    });
});



//Does not work properly!!!
router.get("/menu", (req, res)=> {
    res.render("general/on-menu", {
        title: "Menu Page",
        mealKits: mealkitList.getAllMealKits()
    });
   // res.render("general/on-menu", {
   //     mealkits: mealkitList.getMealsByCategory()
   // });
});







//Add routes to the "Contact-us Page/Sign Up Page"
// router.get("/sign-up", (req, res) => {
//     res.render("general/signup", {
//         title: "Sign Up"
//     });
// });


//update for assignment 3
// router.post("/sign-up", (req, res) => {

//     const { firstName, lastName, email, password } = req.body;

//     let passedValidation = true;
//     let validationMessages = {};

//     if (typeof firstName !== "string"  || firstName.trim().length == 0) {
//         //first name is not a string or is an empty string
//         passedValidation = false;
//         validationMessages.firstName = "Please enter your first name";
//     }
//     else if (typeof firstName !== "string"  || firstName.trim().length < 2) {
//         //first name is not a string or is only a single character 
//         passedValidation = false;
//         validationMessages.firstName = "First name must contain at least 2 characters long";
//     }

//     if (typeof lastName !== "string"  || lastName.trim().length == 0) {
//         //last name is not a string or is an empty string
//         passedValidation = false;
//         validationMessages.lastName = "Please enter your last name";
//     }


//     // check email 
//     var regExpEmail = /\S+@\S+\.\S+/;

//     if (email.trim().length == 0) {
//         //email is not an empty
//         passedValidation = false;
//         validationMessages.email = "Please enter email address";
//     }
//     else if(!regExpEmail.test(email)) {
//         passedValidation=false;
//         validationMessages.email = "Please emter valid email address";
//     }
    
    
//     //check PASSWORD
//     var minNumOfChar = 8;
//     var maxNumOfChar = 12;
//     var regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;

//     if(password.trim().length == 0){
//         passedValidation = false;
//         validationMessages.password = "Please enter your password";
//     }
//     else if(password.length < minNumOfChar || password.length > maxNumOfChar){
//         passedValidation = false;
//         validationMessages.password = "Password should be between 8 and 12 characters";
//     }
//     else if(!regExp.test(password)){
//         passedValidation = false;
//         validationMessages.password = "Password should contain atleast one number, special character, lowercase and uppercase letter";
//     }



//     // VALIDATION OF ALL CRITERIAS

//     if(passedValidation) {
//         const sgMail = require("@sendgrid/mail");
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//         const msg = {
//             to: email,
//             from: "kseniiakatashova@gmail.com", //from: "kkatashova@myseneca.ca", 
//             subject: "Contact Us form Submission",
//             html: 
//                 `Welcome on our team, ${firstName}!<br>
//                 Thanks for signing up with "Cool Beans"!<br><br>
//                 Here your account details:<br>
//                 Name: ${firstName} ${lastName}<br>
//                 Email: ${email}<br><br>
                
//                 Regards,<br><br>
//                 Kseniia Katashova<br>
//                 Executive Manager <br>
//                 cell: +685 086 6556<br>
//                 kkatashova@myseneca.ca
//                 `,
//         };

//         sgMail
//             .send(msg)
//             .then(() => {
//                // res.send("Success, validation passed and email has been sent.");    
//                 res.redirect("/welcome");
//             })
//             .catch((err) => {
//                 console.log(err);

//                 res.render("general/signup", {
//                     title: "Sign-up",
//                     values: req.body,
//                     validationMessages
//                 });
//             });
//     }
//     else {
//         res.render("general/signup", {
//             title: "Sign-up",
//             values: req.body,
//             validationMessages
//         });
// }});





//Route to the Log-in Page
// router.get("/log-in", (req, res) => {
//     res.render("general/login", {
//         title: "Login Page"
//     });
// });

//update for assignment 3
// router.post("/log-in", (req, res) => {

//     const { email, password } = req.body;

//     let passedValidation = true;
//     let validationMessages = {};

//     if ( email.trim().length == 0  && password.trim().length == 0) {
//         //both email and password are empty
//         passedValidation = false;
//         validationMessages.email = "Please enter your email address";
//         validationMessages.password = "Please enter the password";
//     }
//     else if (typeof email !== "string"  || email.trim().length == 0) {
//         //email is not a string or is an empty string
//         passedValidation = false;
//         validationMessages.email = "Please enter your email address";
//     }
//     else if ( typeof password !== "string" || password.trim().length ==0) {
//         //check password
//         passedValidation = false;
//         validationMessages.password = "Please enter the password";
//     }
  
     

//     if (passedValidation) {
//         res.send("Passed Validation");
//     }
//     else {
//         res.render("general/login", {
//             title: "Login Page",
//             values: req.body,
//             validationMessages
//         });
// }});


//Route to the Welcome Page 
router.get("/welcome", (req, res) =>{
    res.render("general/welcome", {
        title: "Welcome Page"
    });
});





module.exports = router;
