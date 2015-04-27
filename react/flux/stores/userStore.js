import { AppDispatcher } from './../Dispatcher.js';
import objectAssign from 'react/lib/Object.assign';
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "userChange";
var _store = {
    user: false
};

function assignUser(user){
  _store.user = user;
}

function updateUser(update){
  _store.user[update.updateField] = update.data;
}

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
      assignUser(action.data);
      userStore.emit(CHANGE_EVENT);
      break;
    case 'UPDATE_USER':
      updateUser(action.data);
      userStore.emit(CHANGE_EVENT);
      break;
  }
});

export { userStore };
