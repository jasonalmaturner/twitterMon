import { userHub } from './../storage/userHub';

var userRequests = {
  userLookUp(req, res){
    userHub.get(req.user.id).then(function(user){
      if(user.length === 1){
        res.status(200).json(user[0]);
      } 
    }, function(err){

    });
  }, getCurrentUser(req){
    req.body = this.sessions.passport.user;
  }
};

export { userRequests };
