import { React, Router, axios, userActions, userStore, stylesObj, colorObj } from './../exportHub';


class Loading extends React.Component {
  constructor(){
    this.state = {
      transition: ''
    };
  }
  componentDidMount(){
    userStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillMount(){
    switch (this.props.params.transition){
      case 'dashboard':
        userActions.userCheck();
        break;
      case 'new-user':
        userActions.submitNewUser(userStore.getCurrentUser());

    }
  }

  _onChange(){
    var user = userStore.getCurrentUser();
    var routing = this.context.router;
    switch(this.props.params.transition){
      case 'dashboard':
        user.twitterMon ? routing.transitionTo('dashboard', {id: user.id}) : routing.transitionTo('register');
        break;
      case 'new-user':
        routing.transitionTo('dashboard', {id: user.id});
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
