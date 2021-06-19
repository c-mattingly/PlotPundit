const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
//Require your User Model here!

// configuring Passport!
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
// this function gets called when we login 
// after oauth consent screen
function(accessToken, refreshToken, profile, cb) { // verify callback
  User.findOne({'googleId': profile.id}, function(err, userDoc){
    //googleId is a property on the model that we are searching for the value
    if(err) return cb(err);

    if(userDoc){
      // If that user exists 
      // lets proceed in the middleware chain to passport!
      // signature for the cb function is cb(error, UserDocument)
      return cb(null, userDoc)
    } else {
        // if the user doesn't exist we want to create a new User
         // and save them to our database and include that actually googleId to identify the user
         const newUser = new User({
           name: profile.displayName,
           googleId: profile.id
         })

         newUser.save(function(err){
          if(err) return cb(err);
          // cb provides the information to passport and pass along in the middleware chain
          return cb(null, newUser)

         });
    }
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, userDoc){
    done(err, userDoc);
  });

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

});



