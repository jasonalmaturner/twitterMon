import React from 'react';

import { checkForUser } from './../shared/checkForUser';

var Dashboard = checkForUser(class extends React.Component {
  constructor(props){

  }
  render(){
    return (
      <div>
        Dashboard
      </div>
    );
  }
});

export { Dashboard };
