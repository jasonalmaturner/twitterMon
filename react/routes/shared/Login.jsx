import React from 'react';

import { userActions } from './../../flux/actions/userActions';
import { userStore } from './../../flux/stores/userStore';

class Login extends React.Component {
  constructor (props){
    this.state = {
      user: false
    };
  }
  componentDidMount(){
    userStore.addChangeListener(this._onChange.bind(this));
  }
  _onChange(){
    this.setState({
      user
    });
  }

  render(){
    return (
      <div>
        <a href="http://localhost:4001/auth"><i className="fa fa-twitter-square"></i></a>
      </div>
    );
  }
}

export { Login };
