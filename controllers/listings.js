
const Listing=require("../models/listing.js");
module.exports.index=async(req,res)=>{
    const allListings= await Listing.find({});
  res.render("listings/index.ejs",{allListings});
  
  }
  module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
      
  }

  module.exports.showListings=async(req,res)=>{ 

    let {id}=req.params;
let showListings=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
if(!showListings){
    req.flash("error","Listing  does not exist");
   return res.redirect("/listings");
}
res.render("listings/show.ejs",{showListings});
}
module.exports.createListing=async(req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;

    let newListing=new Listing(req.body.Listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
        await newListing.save();
        req.flash("success","New Listing Created");

         res.redirect("/listings");
    
    }


    module.exports.renderEditForm=async(req,res)=>{
        let {id}=req.params;
        let showListings=await Listing.findById(id);
        if(!showListings){
            req.flash("error","Listing  does not exist");
            res.redirect("/listings")
        }

        res.render("listings/edit.ejs",{showListings ,originImage});
        
        }
        module.exports.updateListing=async(req,res)=>{
            let {id}=req.params;
        let  listing=await Listing.findByIdAndUpdate(id,{...req.body.Listing});
        if( typeof req.file !="undefined"){
          let url=req.file.path;
          let filename=req.file.filename;
          listing.image={url,filename};
          await listing.save();
        }

        
   
         req.flash("success","Listing Updated");
         res.redirect("/listings")
        }
      module.exports.destroyListing=async(req,res)=>{
        let {id}=req.params;
      await  Listing.findByIdAndDelete(id);
      req.flash("success","Listing Deleted");
        res.redirect("/listings")
    }
