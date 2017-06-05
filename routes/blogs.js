var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//index route
router.get("/",function(req, res){
    if(req.query.search && req.xhr){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Blog.find({title: regex}, function(err, allBlogs){
            if(err){
                console.log(err);
            } else {
                res.status(200).json(allBlogs);
            }
        });
    }else{
        Blog.find({}).sort({"created":1}).exec(function(err, allBlogs){
           if(err){
               console.log(err);
           } else{
               if(req.xhr){
                   res.json(allBlogs);
               }
               res.render("blogs/index",{blogs:allBlogs}); 
           }
        });
    }
});


//new route, create a form for new post
router.get("/new", function(req, res){
    res.render("blogs/new");
});

//create route, add new post to db
router.post("/", function(req, res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    if(req.body.blog.body==null){
        res.redirect("/blogs/new");
    }else{
        Blog.create(req.body.blog,function(err, newBlog){
          if(err){
              res.render("blogs/new");
          } else{
              res.redirect("/blogs");
          }
        }); 
    }
});

//show route, show a single post 
router.get("/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/blogs");
      } else{
          res.render("blogs/show",{blog:foundBlog});
      }
   });
});

//edit route
router.get("/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else{
           res.render("blogs/edit", {blog:foundBlog}); 
       }
    });
});

//update route
router.put("/:id", function(req, res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//delete route
router.delete("/:id", function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/blogs");
      } else{
          res.redirect("/blogs");
      }
   });
});

module.exports = router;