var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/gallary");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));



var gallarySchema = new mongoose.Schema({
      name:String,
      image:String,
     description:String
});

var Gallary = mongoose.model("Gallary",gallarySchema);

 // Gallary.create(
   //   {
     //     name:"Secrete book",
       //   image:"https://cdn.pixabay.com/photo/2014/02/02/17/41/photo-256889_960_720.jpg"
//
  //},function(err,gallary){
    //      if(err){
      //        console.log(err);
        //  }else{
          //    console.log("newly created gallary: ");
            //  console.log(gallary);
          ///}
      //});
//show all gallaries
app.get("/gallaries",function(req,res) {

    Gallary.find({}, function (err, allGallaries) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {gallaries: allGallaries});
        }

    });
});
//create add database
app.post("/gallaries",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newGallary = {name:name,image:image,description:description}
      Gallary.create(newGallary,function(err, newlyCreated){
          if(err){
              console.log(err);
          }else{
              res.render("/gallaries")
          }
      });
});
//show form to create new galary
app.get("/gallaries/new",function(req,res){
    res.render("new.ejs");
    });

//show info about perticular one
app.get("/gallaries/:id",function (req,res) {
    Gallary.findById(req.params.id, function (err, foundGallary) {
        if (err) {
            console.log(err);
        } else {
            res.render("show",{gallary:foundGallary});
        }
    });
});
app.get("/gallaries/:id/edit",function (req,res) {
    Gallary.findById(req.params.id,function (err,foundGallary) {
        if(err){
            res.redirect("/gallaries");
        }else{
            res.render("edit",{gallary:foundGallary});
        }

    });

});
app.put("/gallaries/:id",function (req,res) {
    Gallary.findByIdAndUpdate(req.params.id,req.body.gallary,function (err,updatedGallary) {
        if(err){
            res.redirect("/gallaries");

        }else{
            res.redirect("/gallaries/" + req.params.id);
        }
        
    });
    
});
//delete route
app.delete("/gallaries/:id",function(req,res){
    Gallary.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/gallaries")
        }else{
            res.redirect("/gallaries")
        }
    })
}); 

app.listen(3000,function(){
    console.log("app server is started");
});