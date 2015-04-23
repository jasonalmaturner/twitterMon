import React from 'react';

class Loading extends React.Component {
  constructor(){
    this.state = {
      transition: ''
    };
  }

  componentDidMount(){
    var { router } = this.context;
    console.log('componentDidMount', this.getCurrentParams().transition);
  }

  render(){
    var { router } = this.context;
    console.log('render', this.getCurrentParams().transition);
  }
}

export { Loading };
