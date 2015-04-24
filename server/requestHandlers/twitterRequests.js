import Twit from 'twit';
import q from 'q';
import {constObj} from './../constants';

var twitterRequests = {
  getFollowers(screenName){
    return new Promise(function(resolve, reject){
      new Twit({
        consumer_key: constObj.twitterKey,
        consumer_secret: constObj.twitterSecret,
        access_token: req.session.passport.twitToken,
        access_token_secret: req.session.passport.user.twitTokenSecret
      }).get('followers/ids', {screen_name: screenName}, function(err, data, response){
        if(err){
          reject(err);
        } else {
          console.log(response, data)
          resolve();
        }
      });
    });
  }
};

function isFollower (userId, monId) {

}
