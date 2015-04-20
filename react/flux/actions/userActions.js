import { AppDispatcher } from './../Dispatcher';
import axios from "axios";

var userActions = {
  getCurrentUser(){
    return axios.get('http://localhost:4001/current-user');
  }, assignUser(user){
    AppDispatcher.handleAction({
      actionType: "ASSIGN_USER",
      data: user
    });
  }
};

export { userActions };
