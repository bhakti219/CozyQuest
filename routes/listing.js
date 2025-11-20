const express=require("express");
const router=express.Router();
const Review=require("../models/review.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js")
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });
const  categorizeListing  = require("../controllers/listing");

//Index route
//create Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListings),
);
//Create New Listing

router.get("/new",isLoggedIn,(listingController.renderNewForm))

//category Route

router.get("/category",wrapAsync(listingController.categorizeListing));
router.get("/search",wrapAsync(listingController.searchListing));


// Show Route
//Update Route
//Delete Route
router.route("/:id")
.get( wrapAsync(listingController.showListings))
.put(validateListing,isLoggedIn,upload.single("listing[image]"),isOwner,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//Edit Route 

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;