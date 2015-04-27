import { AppDispatcher } from './../Dispatcher';
import axios from "axios";

var userActions = {
  userCheck(user){
    axios.get('/api/check-for-user').then(function(data){
      userActions.assignUser(data.data);
    });
  },
  assignUser(user){
    AppDispatcher.handleAction({
      actionType: "ASSIGN_USER",
      data: user
    });
  },
  updateStoreUser(update){
    AppDispatcher.handleAction({
      actionType: "UPDATE_USER",
      data: update
    });
  },
  submitNewUser(user){
    axios.post('/api/add-user', user).then(function(data){
      console.log(11111, data.data);
      userActions.assignUser(data.data);
    });
  }
};

export { userActions };
