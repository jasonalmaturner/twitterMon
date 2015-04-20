import React from 'react';
import { RouteHandler, Link } from "react-router";

import { Login } from './shared/Login';

var Main = React.createClass({
  render(){
    return (
      <div>
        <Login />
        <RouteHandler />
      </div>
    );
  }
});

export { Main };
