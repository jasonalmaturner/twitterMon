var r = require('rethinkdbdash')();

var users = r.db('twitterMon').table('users');
var userHub = {
  get(id){
    return users.filter({user: {id: id}});
  },
  post(user){
    return users.insert({user: user});
  }
};

export { userHub };
