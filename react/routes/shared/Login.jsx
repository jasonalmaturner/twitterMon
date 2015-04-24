import { React, userActions, userStore, colorObj, stylesObj } from './../exportHub';

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
      user: userStore.getCurrentUser()
    });
  }

  render(){
    var user;
    if(this.state.user){
      user = <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <span style={stylesObj.headerText}>{this.state.user.name}</span>
                <span style={stylesObj.headerText}>@{this.state.user.screen_name}</span>
              </div>;
    } else {
      user = <a href="/auth"><button style={stylesObj.utilButton}>Login</button></a>;
    }
    return (
      <div>
        {user}
      </div>
    );
  }
}

export { Login };
