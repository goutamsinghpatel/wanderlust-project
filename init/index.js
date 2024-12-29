const mongoose = require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main().then((data)=>{
    console.log("ok");
})
.catch((err)=>{
   console.log(err);
}) 
const initDB=async()=>{
 await Listing.deleteMany({});
 initdata.data=initdata.data.map((obj)=>({
 ...obj,
    owner:'6755acb69ef2900c46030d97',
}))
 await Listing.insertMany(initdata.data);
 console.log("data was initialized");

}

initDB();