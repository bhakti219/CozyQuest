
const User = require("../models/user.js");  

module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signUpUser=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
         if(err){
          return next(err);
        }
        req.flash("success","You are Logged In!");
        return res.redirect("/listings");
    });
    } catch(e){
        req.flash("error",e.message);
          return res.redirect("/signup");
    }

}

module.exports.renderLoginForm=(req,res)=>{
     return res.render("users/login.ejs");
}

module.exports.login=  async(req,res)=>{
            req.flash("success","WellCome to WanderLust You are Logged in!!");
            let redirectUrl=res.locals.redirectUrl||"/listings";
              return res.redirect(redirectUrl);
        }

        module.exports.logOut=(req,res)=>{
    req.logOut((err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","You are Logged Out!");
         return res.redirect("/listings");
    })
}