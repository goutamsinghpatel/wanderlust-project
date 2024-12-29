const express=require("express");
const app=express();
const session=require("express-session")
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.listen(3000,()=>{
    console.log("Server start");
})
app.use(session({secret:"mySupersecretstring" ,resave:false, saveUninitialized:true}));
app.use(flash())

app.get("/resister",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name
    req.flash("succes","good");
res.redirect("/hello");
})
app.get("/hello",(req,res)=>{
res.render("page.ejs",{name:req.session.name,msg:req.flash("succes")})
})

