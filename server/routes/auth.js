const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function(accessToken, refreshToken, profile, done) {
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName:profile.name.familyName,
        profileImage: profile.photos[0].value,

    };
    try {
        let user = await User.findOne({googleId : profile.id});
        if(user){
            done(null,user);
        }else{
            user = await User.create(newUser);
            done(null,user);
        }
    } catch (error) {
        console.log(error);
    }

  }
));



//google login route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));
// retrieve user data
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login-failure',
    successRedirect:'/dashboard'
    }),
 );

 router.get('/login-failure',(req,res)=>{
    res.send("something went wrong......")
 })
// destroy user session when user is logged in so he can log out
router.get("/logout", (req,res)=>{
    req.session.destroy(error =>{
        if(error){
            console.log(error);
            res.send("error logging out..");
        }else{
            res.redirect("/");
        }
    })
})
//Persist user data after successful authentication
//When a user logs in successfully, we want to remember who they are in future requests. 
passport.serializeUser(function(user,done){ // we will also be able to use req.user.id
    done(null,user.id);
});
//retrieve user data from session
passport.deserializeUser(function(id,done){
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
})

module.exports = router;