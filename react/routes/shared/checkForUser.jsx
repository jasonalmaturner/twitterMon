import React from 'react';
import axios from 'axios';
import { userActions } from './../../flux/actions/userActions';

var checkForUser = (Component) => {
  return class UserCheck extends React.Component {
    static willTransitionTo(transition){
      userActions.getCurrentUser().then(function(data){
        if(!data.twitterMon){
          transition.redirect('/register');
        } else {
          transition.abort();
        }
      });
    }
    render (){
      return <Component {...this.props} />;
    }
  };
};

export { checkForUser };
