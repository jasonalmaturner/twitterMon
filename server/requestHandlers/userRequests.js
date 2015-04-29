import { userHub } from './../storage/userHub';

var userRequests = {
  userLookUp(req, res){
    // console.log(req.user);
    userHub.get(req.user.id).then(function(user){
      if(user.length === 1){
        req.user.twitterMon = user[0];
        res.status(200).json(slimUser(req.user, wants));
      } else if(!user.length) {
        req.user.twitterMon = false;
        res.status(200).json(slimUser(req.user, wants));
      } else {
        res.status(500).json({message: 'Duplicates'});
        console.log("Apparently there are duplicates?");
      }
    }, function(err){
      res.status(500).json(err);
    });
  },
  postUser(req, res){
    userHub.get(req.body.id).then(function(resp){
      if(!resp[0]){
        userHub.post(req.body.twitterMon).then(function(data){
          userHub.get(req.user.id).then(function(data){
            console.log(data);
            var user = slimUser(req.user, wants);
            user.twitterMon = data[0].user;
            res.status(200).json(user);
          });
        }, function(err){
          res.status(500).json(err);
        });
      } else {
        res.redirect('/#/dashboard/' + req.user.id);
      }
    }, function(erro){
      res.status(500).json(erro);
    });
  }
};

export { userRequests };

function slimUser(obj, arr){
  var userObj = {};
  for(var i = 0; i < arr.length; i++){
    userObj[arr[i]] = obj[arr[i]];
  }
  return userObj;
}

var wants = ["id", "screen_name", "name", 'profile_image_url', 'profile_background_color', 'twitterMon'];
