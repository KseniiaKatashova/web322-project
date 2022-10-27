/*************************************************************************************
* WEB322 - 2227 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Kseniia Katashova 
* Student ID    : 138164207
* Course/Section: WEB322/NEE
*
**************************************************************************************/

const path = require("path");
const exphbs = require("express-handlebars");
const express = require("express");
const app = express();

const mealkitList = require("./models/mealkit-db");
const { title } = require("process");

//Set up Handlebars
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
}));

app.set("view engine", ".hbs");

//Set up body-parser
app.use(express.urlencoded({extended: false}));


// make "assets" folder public and static 
app.use(express.static(path.join(__dirname, "/assets")));



// Add your routes here
// app.get("/", function(req, res){
//     res.render("home");
// });

app.get("/", (req, res) => {


    res.render("home", {
        mealKits: mealkitList.getTopMealkits()
    });
});





//Does not work properly!!!
app.get("/menu", (req, res)=> {

    
     res.render("on-menu", {
         mealKits: mealkitList.getAllMealKits()
     });
    // res.render("on-menu", {
    //     mealkits: mealkitList.getMealsByCategory()
    // });
});

app.get("/sign-up", function(req, res){
    res.render("signup");
});

//update for assignment 3
app.post("/sign-up", (req, res) => {
    //console.log(req.body);

    const { firstName, lastName, email, password } = req.body;

    let passedValidation = true;
    let validationMessages = {};

    if (typeof firstName !== "string"  || firstName.trim().length == 0) {
        //first name is not a string or is an empty string
        passedValidation = false;
        validationMessages.firstName = "You must specify a first name";
    }
    else if (typeof firstName !== "string"  || firstName.trim().length < 2) {
        //first name is not a string or is only a single character 
        passedValidation = false;
        validationMessages.firstName = "First name must contain at least 2 characters long";
    }

    if(passedValidation) {
        res.send("Passed Validation");
    }
    else {
        res.render("signup", {
            values: req.body,
            validationMessages
        });
}});



app.get("/log-in", function(req, res){
    res.render("login");
});



// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);