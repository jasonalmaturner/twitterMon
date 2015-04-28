import { React, axios, colorObj, stylesObj } from './../exportHub';
import { Login } from './../sharedHub';

class Welcome extends React.Component{

  render(){
    return (
      <div>
        Welcome Poop Heads
        <Login />
      </div>
    );
  }
}

export { Welcome };
