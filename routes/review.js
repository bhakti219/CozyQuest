
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const reviewController=require("../controllers/reviews");

// Create review
router.post("/", isLoggedIn, wrapAsync(reviewController.createReview));

// Delete review
router.delete("/:reviewId", isLoggedIn, wrapAsync(reviewController.destroyReview));

module.exports = router;
