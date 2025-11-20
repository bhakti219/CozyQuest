const Listing=require("../models/Listing.js")



module.exports.index=async(req,res)=>{
  const allListings=await Listing.find({});
 return res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{
 
  return res.render("listings/new.ejs")
}


module.exports.showListings=async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({path:"reviews",
    populate:{
      path:"author",
    }
  })
   .populate("owner");
  if(!listing){
req.flash("error","listing you requested does not exist!");
return res.redirect("/listings")
  }
  return res.render("listings/show.ejs", { listing });
}

module.exports.createListings=async(req,res,next)=>{
 let url=req.file.path;
 let filename=req.file.filename;
  const newListing=new Listing(req.body.listing);
  newListing.owner=req.user._id;
  newListing.image={url,filename};
  await newListing.save();
  req.flash("success","new listing created!")
  return res.redirect('/listings');
}
module.exports.renderEditForm=async (req,res)=>{
  
   let {id} =req.params;
  const listing=await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing You Requested Does not Exist!!");
    return res.redirect("/listings")
  }
let orignalImageUrl=listing.image.url;
orignalImageUrl.replace("/upload/h_300,w_250");

  return res.render("listings/edit.ejs",{listing,orignalImageUrl});
  
}

module.exports.updateListing=async(req,res)=>{
  let {id}=req.params;
   let url=req.file.path;
  
 let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file!=="undefined"){
      let filename=req.file.filename;
      listing.image={url,filename};
      await listing.save();
   }

    req.flash("success","Listing Updated!")
  return res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async (req,res)=>{
  let {id}=req.params;
  let deleteListing=await Listing.findByIdAndDelete(id);
  req.flash("success","Deleted listing!")
  return res.redirect("/listings")
}

module.exports.categorizeListing=async(req,res)=>{
    let category=req.query.category;
      if(!category){
req.flash("error","No Listings in this Categiry Available");
return res.redirect("/listings")
  }
    let allCategories=await Listing.find({category:category});

        if (allCategories.length === 0) {
        req.flash("error", "No listings available in this category.");
        return res.redirect("/listings");
    }
    
   return res.render("listings/category.ejs",{allCategories,category});
}

module.exports.searchListing=async(req,res)=>{
  let destination=req.query.destination;
  if(!destination){
    req.flash("error","No Listings Available at this Destination");
    return res.redirect("/listings") 
  }
  let allResult=await Listing.find({location:destination});
        if (allResult.length === 0) {
        req.flash("error", "No listings available at this Destination");
        return res.redirect("/listings");
    }
     return  res.render("listings/search.ejs",{allResult,destination});

}