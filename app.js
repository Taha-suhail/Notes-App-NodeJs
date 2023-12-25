require('dotenv').config(); // load the variables from .env file
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require("./server/config/db");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
const mongoStore = require("connect-mongo"); //provides session storage using MongoDB,
const app = express();
const port = 3000 || process.env.PORT;
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store:mongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    })
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended:true}));//the data submitted from the form would be available in your route handler as req.body.username and req.body.password
app.use(methodOverride("_method"));
app.use(express.json());

connectDB();
//static files
app.use(express.static("public"));
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',require('./server/routes/index'))
app.use('/',require('./server/routes/dashboard'))
app.use('/',require('./server/routes/auth'))
// handle 404 error when user going to a route that doesnt exist
app.get("*",function(req,res){
    res.status(404).render("404");
})
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})