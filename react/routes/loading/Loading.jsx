import { React, Router, axios, userActions, userStore, stylesObj, colorObj } from './../exportHub';


class Loading extends React.Component {
  constructor(){
    this.state = {
      transition: ''
    };
  }

  componentWillMount(){
    switch(this.props.params.transition){
      case 'dashboard':
        userCheck.call(this);
    }
  }

  render(){
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
}

Loading.contextTypes = {
  router: React.PropTypes.func
};

export { Loading };

function userCheck(){
  return axios.get('/api/check-for-user').then((data)=>{
    var routing = this.context.router;
    userActions.assignUser(data.data);
    data.data.twitterMon ? routing.transitionTo('dashboard', {id: 'dunno yet'}) : routing.transitionTo('register');
  });
}
