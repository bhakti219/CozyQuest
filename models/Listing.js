const mongoose = require("mongoose");
const review = require("./review.js");
const Schema = mongoose.Schema;
const Review=require("./review.js")


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
         required: true,
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
         required: true,
    },
    location: {
        type: String,
         required: true,

    },
    country: {
        type: String,
         required: true,

    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
         ref:"User",
           default: "673f85f2a777e8b8d8f8cabc" 
    },
    category:{
        type:String,
        enum: ["Rooms","Iconic Cities","Mountains","Castles","Amazing Pool","Camping","Farms","Arctic"]
    }
   
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
          await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema)
module.exports = Listing;