import React from 'react';

import axios from 'axios';

var Welcome = React.createClass({
  test(){
    axios.get('http://localhost:4001/test').then(function(data){
      console.log(data);
    });
  },
  render(){
    return (
      <div>
        <p onClick={this.test}>Test Me</p>
        Welcome
      </div>
    );
  }
});

export { Welcome };
