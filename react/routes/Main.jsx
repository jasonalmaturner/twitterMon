import React from 'react';
import { RouteHandler, Link } from "react-router";

import { Login } from './shared/Login';

require('./mainStyles.css');

class Main extends React.Component{
  constructor(){
    this.state = {
      currentUser: null
    };
  }

  setCurrentUser(user){
    this.setState({
      currentUser: user
    });
  }

  render(){
    return (
      <div>
        <Login />
        <RouteHandler {...this.props}/>
      </div>
    );
  }
}

export { Main };
