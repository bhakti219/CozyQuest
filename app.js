if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const Listing = require("./models/Listing.js");

const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js")

// const Mongo_Url ='mongodb://127.0.0.1:27017/Wanderlust';
const dbURL=process.env.ATLASDB_URL;

//ROuters
const listingRouters=require('./routes/listing.js');
const reviewRouters=require('./routes/review.js');
const userRouters=require('./routes/user.js');



main().then(()=>{
  console.log("Connected to DB");
}).catch((err)=>{
  console.log("Error is in store: ",err);
})
async function main() {
  console.log(dbURL)
  await mongoose.connect(dbURL)
    .then(() => console.log("Mongoose connected"))
  .catch(e => console.log("Mongoose connection error:", e));
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));


console.log("Mongoose client:", mongoose.connection.getClient());
const store= MongoStore.create({
mongoUrl:dbURL,
 collectionName: "sessions",
  touchAfter:24*3600,
});
 

const sessionOptions={

  store:store,
  secret:process.env.Secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
     expires:Date.now()+7*24*60*60*1000,
     maxAge:7*24*60*60*1000,
     httpOnly:true
  }
 
};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})

app.use("/listings",listingRouters);
app.use("/listings/:id/reviews",reviewRouters);
app.use("/",userRouters);
//For Invalid path

app.all(/.*/,(req,res,next)=>{
  next(new ExpressError("Page Not Found", 404));
})

// Error Handling MiddleWare
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Delegate to default Express error handler
  }
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render('error', { message });
});


app.listen(8080,()=>{
    console.log("App is listening at port 8080")
});