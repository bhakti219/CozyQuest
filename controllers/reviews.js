  
const Listing=require("../models/Listing");
const Review = require("../models/review");

  module.exports.createReview=async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("reviews");
 console.log(req.body)
  const review = new Review(req.body.review);
  review.author = req.user._id;
  listing.reviews.push(review);
  await review.save();
  await listing.save();
  req.flash("success", "Review added successfully!");
  return res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  return res.redirect(`/listings/${id}`);
}