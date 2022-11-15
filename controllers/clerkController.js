const { application } = require("express");
const express = require("express");
const router = express.Router();


//Add your routs here
//e.g. app.get() (...)
router.get("/list-mealkits", (req, res)=> {
    if(!req.session.isClerk){
        res.send("You are not a clerk!")
    }
    else
    {
        res.render("clerk/list-mealkits", {
            title: "Clerk_Dashboard"
        });
    }
   
});



module.exports = router;
