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



//Route to the Welcome Page 
router.get("/welcome", (req, res) =>{
    res.render("general/welcome", {
        title: "Welcome Page"
    });
});



module.exports = router;
