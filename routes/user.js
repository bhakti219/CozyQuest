const express=require("express");
const router=express.Router(); 
const passport = require("passport");  
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users");

router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signUpUser));

//Login Page
router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",
        {failureRedirect:'/login',
            failureFlash:true
        }),
        userController.login
    );

    //Logout
router.get("/logout",userController.logOut)
 module.exports=router;