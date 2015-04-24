import { React, stylesObj, colorObj, axios, Router, userStore } from './../exportHub';

class Initiate extends React.Component {
  constructor(){
    this.state = {
      team: [],
      status: "Search for a follower"
    };
  }

  addToTeam(follower){
    this.setState({
      team: this.state.team.concat([follower])
    });
  }

  removeFollower(index){
    var newList = this.state.team;
    newList.splice(index, 1);
    this.setState({
      team: newList,
      status: "Poof they're gone!"
    });
  }

  handleKeyDown(e){
    if(e.keyCode === 13){
      console.log("here we go");
      this.findFollower(this.refs.screen_name.getDOMNode().value);
    }
  }

  findFollower(name){
    axios.get(`/api/mondata?monname=${name}`).then((data)=>{
      console.log(data);
      this.setState({
        team: this.state.team.concat([data.data]),
        status: getStatus(data.data.subtype + data.data.type)
      });
    }, (err)=>{
      switch (err.message){
        case "User not found.":
          this.setState({
            status: "That user doesn't seem to exist."
          });
          break;
        case "Not your friend":
          this.setState({
            status: "Only people you follow you can be in your team."
          });
      }
    });
  }

  render(){
    if(!userStore.getCurrentUser()){
      this.context.router.transitionTo('welcome');
    }
    var followerTeam = this.state.team.map((item, index)=>{
      return <div key={index}>
              <button onClick={this.removeFollower.bind(this, index)} style={stylesObj.utilButton}>Actually No</button>
              <p>i'll put an animation here later</p>
              <table>
                <tr>
                  <td>
                    {item.screen_name}
                  </td>
                  <td>
                    {item.name}
                  </td>
                </tr>
              </table>
            </div>;
    });

    return (
      <div>
        Initiation
        <p>{this.state.status}</p>
        <input style={{fontSize: '3rem'}} ref="screen_name" placeholder="Screen Name" onKeyDown={this.handleKeyDown.bind(this)}/>
        {followerTeam}

      </div>
    );
  }
}

Initiate.contextTypes = {
  router: React.PropTypes.func
};

export { Initiate };

function getStatus(type){
  switch (type){
    case "magicwalrus":
      return "Wizard Walrus";
      break;
    case "strengthwalrus":
      return "something something";
      break;
    case "stealthwalrus":
      return "something something";
      break;
    case "magicrobot":
      return "something something";
      break;
    case "stealthrobot":
      return "something something";
      break;
    case "strengthrobot":
      return "something something";
      break;
    case "magichamburger":
      return "something something";
      break;
    case "stealthhamburger":
      return "something something";
      break;
    case "strengthhamburger":
      return "something something";
      break;
  }
}
