import Twit from 'twit';
import q from 'q';
import {constObj} from './../constants';

var twitterRequests = {
  isFollower(userId, monName){

  }
};

// Get stats of the potential tiwtterMon
function getFollowing(userId, monName, nextCursor) {
  return new Promise(function(resolve, reject){
    new Twit({
      consumer_key: constObj.twitterKey,
      consumer_secret: constObj.twitterSecret,
      access_token: req.session.passport.twitToken,
      access_token_secret: req.session.passport.user.twitTokenSecret
    }).get()
  })
}

// Get list of ids that are following the potential twitterMon
function twitFriends(monName, nextCursor, previousData){
  return new Promise(function(resolve, reject){
    if(nextCursor){
      new Twit({
        consumer_key: constObj.twitterKey,
        consumer_secret: constObj.twitterSecret,
        access_token: req.session.passport.twitToken,
        access_token_secret: req.session.passport.user.twitTokenSecret
      }).get('friends/ids', {screen_name: monName, next_cursor: nextCursor}, function(err, data, respose){
        if(err){
          var errObj = {
            err: err,
            collectedData: data
          };
          reject(errObj);
        } else if(data.next_cursor){
          twitFriends(userId, monName, nextCursor, data.next_cursor, data.ids.concat(previousData));
        } else {
          resolve(data.ids.concat(previousData));
        }
      });
    } else {
        new Twit({
          consumer_key: constObj.twitterKey,
          consumer_secret: constObj.twitterSecret,
          access_token: req.session.passport.twitToken,
          access_token_secret: req.session.passport.user.twitTokenSecret
        }).get('friends/ids', {screen_name: monName}, function(err, data, response){
          if(err){
            reject(err);
          } else if(data.next_cursor){
            twitFriends(userId, monName, data.next_cursor, data.ids);
          } else {
            resolve(data.ids);
          }
        });
    }
  });
}

// Check to see if the potential twitterMon is following the user
function isFollower (userId, monFollowing) {
    return monFollowing.indexOf(userId) !== 1;
}
