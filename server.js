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
const mongoose = require("mongoose");
const session = require("express-session");

//Set up dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });



//Set up Handlebars
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
}));

app.set("view engine", ".hbs");

//Set up body-parser
app.use(express.urlencoded({extended: true}));   

//Connect to the MongoDb
mongoose.connect(process.env.MONGODB_KEY,     
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{
        console.log("Connected to the MongoDB database.")
    })
    .catch(err => {
        console.log(`There was a problem connecting to MongoDB...${err}`);
    });


//Set up express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    //res.locals.user is a global handlebars variable
    //This means that every single handlebars file can access this variable
    res.locals.user = req.session.user;
    res.locals.isClerk = req.session.isClerk;
    next();
});


// Make "assets" folder public and static 
app.use(express.static(path.join(__dirname, "/assets")));



//Configure the controllers
const generalController = require("./controllers/generalController");
const userController = require("./controllers/userController");

const clerkController = require("./controllers/clerkController");
const customerController = require("./controllers/customerController");

app.use("/", generalController);
app.use("/user/", userController);

app.use("/clerk/", clerkController);
app.use("/customer/", customerController);



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