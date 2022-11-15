const { application } = require("express");
const express = require("express");
const router = express.Router();
const mealkitList = require("../models/mealkit-db");

//Add your routs here
//e.g. app.get() (...)
router.get("/cart", (req, res)=> {
    if(req.session.isClerk){
        res.send("You are not a customer!")
    }
    else
    {
        res.render("customer/cart", {
            title: "Customer_Dashboard"
        });
    }
   
});



module.exports = router;
