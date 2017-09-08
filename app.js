var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    DreamLog        = require("./models/dreamlog"),
    seedDB          = require("./seeds"),
    moment          = require("moment"),
    User            = require("./models/user"),
    methodOverride  = require("method-override");

// Set Hungarian time format
moment.locale("hu");

//Config framework
mongoose.connect("mongodb://localhost/dreamlog");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
mongoose.Promise = global.Promise; // Not using promises here
app.use(methodOverride("_method")); //Override POST for RESFTful design and implement DELETE

// Initializa DB with sample data
//seedDB();

// Passport configuration
app.use(require("express-session")({
    secret:"Az eg kek, a fu zold",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})


app.get("/",function(req,res){
    res.redirect("/dreamlogs");
});

// INDEX
app.get("/dreamlogs",  function(req,res){ //isLoggedIn,
    // get all dreamlogs from DB
    DreamLog.find({}, function(err,allDreamLogs){
            if(err) {
                console.log(err);
            } else {
            res.render("index",{dreamlogs:allDreamLogs,moment:moment,currentUser:req.user});
            }
    });
});

// CREATE - add new dream log to database
app.post("/dreamlogs", function(req,res){
   
    // Prepare data to be saved
    
    req.body.dreamlog.dreamSymbols=req.body.dreamlog.dreamSymbols.replace(/\s/g,"");
    req.body.dreamlog.dreamSymbols=req.body.dreamlog.dreamSymbols.split(",").sort();
    req.body.dreamlog.dreamCategory=req.body.dreamlog.dreamCategory.split(",").sort();
    
    // create new dreamlog and save it to database
    
    DreamLog.create(req.body.dreamlog, function(err,dreamlog){
          if(err){
            console.log(err);
        } else {
            //Redirect back to dreamlogs index page
            res.redirect("/dreamlogs");
            
        }
    }
    
    )
});


// Delete - find by id and delete
app.delete("/dreamlogs/:id", function(req,res){
    DreamLog.findByIdAndRemove(req.params.id,function(err){
        if(err) {
            res.redirect("/dreamlogs");
        } else {
            res.redirect("/dreamlogs");
        }
    })
})


// UDPADE - Update dream log
//Find by id and update
app.post("/dreamlogs/:id",function(req,res){
    
    // Prepare data to be saved
    
    req.body.dreamlog.dreamSymbols=req.body.dreamlog.dreamSymbols.replace(/\s/g,"");
    req.body.dreamlog.dreamSymbols=req.body.dreamlog.dreamSymbols.split(",").sort();
    req.body.dreamlog.dreamCategory=req.body.dreamlog.dreamCategory.split(",").sort();
    
    
    DreamLog.findByIdAndUpdate(req.params.id,req.body.dreamlog, function(err,updatedDreamlog){
        if(err) {
            console.log(err) } 
            else {
            //Redirect back to dreamlogs index page
            res.redirect("/dreamlogs");
            }
    })
})





// NEW - show form to collect new dream data before adding it to database
app.get("/dreamlogs/new",function(req,res){
    DreamLog.find({},{_id:0, dreamSymbols:1},function(err,foundDreamLogs){
        if(err) {
            console.log(err);
        } else {
            
            // Szimbólumok kibányászása egy tömbbe és átadása a GUI-nak
            var symbolList = new Array();
            foundDreamLogs.forEach(function(dreamlog){
                
                dreamlog.dreamSymbols.forEach(function(symbol){
                    
                    if(symbolList.indexOf(symbol)<0) symbolList.push(symbol);    
                })
                
            })
            
            res.render("dreamlogs/new",{symbols:symbolList.sort(), moment:moment})
        }
    })
})
    



// SHOW - shows more info about one DreamLog
app.get("/dreamlogs/:id", function(req,res){
    //Find the dreamlog with provided ID
    
     DreamLog.find({},{_id:0, dreamSymbols:1},function(err,foundDreamLogs){
        if(err) {
            console.log(err);
        } else {
            
            // Szimbólumok kibányászása egy tömbbe és átadása a GUI-nak
            var symbolList = new Array();
            foundDreamLogs.forEach(function(dreamlog){
                
                dreamlog.dreamSymbols.forEach(function(symbol){
                    
                    if(symbolList.indexOf(symbol)<0) symbolList.push(symbol);    
                })
                
            })
            // Keresett napló megjelenítése     
            DreamLog.findById(req.params.id,function(err, foundDreamLog){
                if(err){
                        console.log(err);
                }  else {
                //console.log(foundDreamLogs);
                //Render show template with the DreamLogs Index
                res.render("dreamlogs/show",{symbols:symbolList.sort(),dreamlog:foundDreamLog,moment:moment,currentUser:req.user});       
      }
    });        
            
        }
    })
    
    
    
    
    
   
})



//============
// AUTH ROUTES
//============


// Show register form
app.get("/register",function(req,res){
    res.render("register");
});

// handle signup logic
app.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password, function(err,user){
       if(err){
           console.log(err);
            return res.render("/register")
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/dreamlogs");
        })
    });
});

// Show login form
app.get("/login",function(req,res){
    res.render("login");
});

// Handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect:"/dreamlogs",
        failureRedirect:"/login"
        
    }), function(req,res){
    
});

// Logout route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/login");
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The DreamLog Server has started on: " + moment().format("YYYY-MM-DD h:mm:ss"));
});
