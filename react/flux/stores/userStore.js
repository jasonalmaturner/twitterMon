import { AppDispatcher } from './../Dispatcher.js';
import objectAssign from 'react/lib/Object.assign';
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "userChange";
var _store = {
    user: false
};

var assignUser = function(user){
  _store.user = user;
};

var userStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  getCurrentUser: function(){
    return _store.user;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case "ASSIGN_USER":
      assignUser(payload.data);
      userStore.emit(CHANGE_EVENT);
      console.log(_store);
      break;
  }
});

export { userStore };
