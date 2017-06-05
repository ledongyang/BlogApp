var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app = express();

//requiring routes
var blogRoutes = require("./routes/blogs");
    
var url = process.env.DATABASEURL || "mongodb://localhost/blog_app";
mongoose.connect(url);


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//routes config
app.use("/blogs", blogRoutes);


//root route
app.get("/",function(req, res){
   res.redirect("/blogs"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server has started!"); 
});
    