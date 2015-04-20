import { userHub } from './../storage/userHub';

var userRequests = {
  userLookUp(req, res){
  }, getCurrentUser(req){
    req.body = this.sessions.passport.user;
  }
};

export { userRequests };
