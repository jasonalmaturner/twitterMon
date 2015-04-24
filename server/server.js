/* App Imports */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

/* Auth Imports */
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';

/* Session */
import session from 'express-session';
var RedisStore = require('connect-redis')(session);

/* My Imports */
import { followerHub } from './twitter/twitterFollowers';
import { constObj } from './constants';
import { userHub } from './storage/userHub';

/* Request Handlers */
import { userRequests } from './requestHandlers/userRequests';
import{ twitterRequests } from './requestHandlers/twitterRequests';

/* My consts */

var replaceMe;
const domainEnv = replaceMe || 'localhost';
const publicUrl = replaceMe || `${domainEnv}:4000`;
const port = replaceMe || 4001;
/* Fire up app */
var app = express();

/* App Middleware */

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: "Jacob-tell=that-one=store-again",
  name: 'twitterMon',
  store: new RedisStore(),
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+'./../public'));

/* Authentication Crap */
passport.use(new TwitterStrategy({
  consumerKey: constObj.twitterKey,
  consumerSecret: constObj.twitterSecret,
  callbackURL: `http://${domainEnv}:4001/auth/callback`
}, function(token, tokenSecret, profile, done) {
  profile = slimUser(profile._json, wants);
  profile.twitToken = token;
  profile.twitTokenSecret = tokenSecret;
  return done(null, profile);
  // return userHub.get(profile.id).then(function(user){
  //   if(user.length){
  //     profile.twitterMon = user;
  //   } else {
  //     profile.twitterMon = false;
  //   }
  //   return done(null, {user: profile});
  // });

}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/*Signing in to Twitter*/
app.get('/auth', passport.authenticate('twitter'));
app.get('/auth/callback', passport.authenticate('twitter', {successRedirect: `/#/loading/dashboard`,failureRedirect: 'http://${publicUrl}/#/'}));

/* User Routes */
app.get('/current-user', userRequests.userLookUp);

/* Twitter Routes*/
app.get('/api/mondata', twitterRequests.isFollower);

app.listen(port, function() {
  console.log(`server listening on ${port}`);
});
/* Functions */

function slimUser(obj, arr){
  var userObj = {};
  for(var i = 0; i < arr.length; i++){
    userObj[arr[i]] = obj[arr[i]];
  }
  return userObj;
}

var wants = ["id", "screen_name", "name", 'profile_image_url', 'profile_background_color'];
