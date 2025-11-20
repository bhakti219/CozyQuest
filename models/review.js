const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//One to Many Relation Listing->Reviews
const reviewSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:"User",
    }
});

module.exports=mongoose.model("Review",reviewSchema);