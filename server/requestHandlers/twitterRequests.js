import Twit from 'twit';
import q from 'q';
import {constObj} from './../constants';

var twitterRequests = {
  isFollower(req, res){
    isFriend(req.user.id, req.query.monname, req).then(function(response){
      if(response){
        getData(req.query.monname, req).then(function(resp){
          console.log(resp)
          res.status(200).json(resp);
        }, function(erro){
          res.status(500).json(erro);
        });
      } else {
        res.status(400).json({message: "Not your friend"});
      }
    }, function(err){
      res.status(500).json(err);
    });
  }
};

function isFriend(userId, monName, req){
  return new Promise(function(resolve, reject){
    new Twit({
      consumer_key: constObj.twitterKey,
      consumer_secret: constObj.twitterSecret,
      access_token: req.user.twitToken,
      access_token_secret: req.user.twitTokenSecret
    }).get('friendships/show', {source_id: userId, target_screen_name: monName}, function(err, data, response){
      if(err){
        reject(err);
      } else {
        resolve(data.relationship.source.followed_by);
      }
    });
  });
}

function getData(monName, req){
  return new Promise(function(resolve, reject){
    new Twit({
      consumer_key: constObj.twitterKey,
      consumer_secret: constObj.twitterSecret,
      access_token: req.user.twitToken,
      access_token_secret: req.user.twitTokenSecret
    }).get('users/show', {screen_name: monName}, function(err, data, response){
      if(err){
        reject(err);
      } else {
        resolve(getWantedData([data], wants)[0]);
      }
    });
  });
}

function getWantedData(data, arr){
  return data.map(function(item){
    var userObj = {};
    for(let i = 0; i < wants.length; i++ ){
        userObj[arr[i]] = item[arr[i]];
    }
    userObj.type = getTypes(userObj.id, true);
    userObj.subType = getTypes(userObj.created_at);
    userObj.stats = getStats(item, userObj.subType);
    return userObj;
  });
}

function getTypes(id, main){
  if(main){
    switch (id % 3){
      case 0:
        return "Walrus";
      case 1:
        return "Robot";
      case 2:
        return "Sponge";
    }
  } else {
    switch ((new Date(id).getTime() - 946783763754) % 3){
      case 0:
        return "Stealth";
      case 1:
        return "Strength";
      case 2:
        return "Magic";
    }
  }
}

function getStats(obj, type){
  var statObj = {
    main: (obj.followers_count / obj.friends_count) + 1
  };
  var days = ((new Date().getTime() - new Date(obj.created_at).getTime())/86400000);
  switch (type){
    case "Stealth":
      statObj.sub = ((1 + obj.listed_count) / days) * 300;
      break;
    case "Strength":
      statObj.sub = (obj.statuses_count / days) * 2.5;
      break;
    case "Magic":
      statObj.sub = (obj.favourites_count / days) * 1.25;
  }
  return statObj;
}

var wants = ['following','id', 'name', 'screen_name', 'followers_count', 'friends_count', 'listed_count', 'created_at', 'favourites_count', 'statuses_count', 'profile_image_url', 'profile_background_color'];


export { twitterRequests };
