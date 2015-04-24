import { React, axios, userStore, colorObj, stylesObj } from './../exportHub';

class Register extends React.Component {
  constructor(){
    this.state = {
      user: userStore.getCurrentUser()
    };
  }

  advance(){
    this.context.router.transitionTo('initiate');
  }

  render(){
    if(!userStore.getCurrentUser()){
      this.context.router.transitionTo('welcome');
    }
    return (
      <div>
        <h1>Registration</h1>
        <h3>We don't need your info. We already have it. Just make sure this is you.</h3>
        <table style={{color: colorObj.turq.plain}}>
          <tr>
            <td>Name</td>
            <td>{this.state.user.name}</td>
          </tr>
          <tr>
            <td>Screen Name</td>
            <td>{this.state.user.screen_name}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{this.state.user.id}</td>
          </tr>
        </table>
        <button style={stylesObj.utilButton} onClick={this.advance.bind(this)}>Let's Start</button>
      </div>
    );
  }
}
Register.contextTypes = {
  router: React.PropTypes.func
};

export { Register };
