import { React, stylesObj, colorObj, axios, Router, userStore, userActions } from './../exportHub';

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
      this.findFollower(this.refs.screen_name.getDOMNode().value);
    }
  }

  findFollower(name){
    this.setState({
      status: "Searching..."
    });
    axios.get(`/api/mondata?monname=${name}`).then((data)=>{
      this.refs.screen_name.getDOMNode().value = '';
      if(!checkExisting(data.data, this.state.team)){
        this.setState({
          team: this.state.team.concat([data.data]),
          status: getStatus(data.data.subType + data.data.type)
        });
      } else {
        this.setState({
          status: "That one's already in your team."
        });
      }

    }, (err)=>{
      console.log(err)
      switch (err.data.message){
        case "User not found.":
          this.setState({
            status: "That user doesn't seem to exist."
          });
          break;
        case "Not your friend":
          this.setState({
            status: "Only people who follow you can be in your team."
          });
      }
    });
  }

  submitUser(){
    var newUser = userStore.getCurrentUser();
    newUser.twitterMon = {
      id: newUser.id,
      team: this.state.team
    };
    userActions.assignUser(newUser);
    this.context.router.transitionTo('/loading/new-user');
  }

  render(){
    if(!userStore.getCurrentUser()){
      this.context.router.transitionTo('welcome');
    }
    var advance;
    if(this.state.team.length < 4){
      advance = <input style={{fontSize: '2rem', display: 'block'}} ref="screen_name" placeholder="Screen Name" onKeyDown={this.handleKeyDown.bind(this)}/>;
    } else {
      advance = <div>You can always change your team later... but for now <button onClick={this.submitUser.bind(this)}>Register Team</button></div>;
    }
    var followerTeam = this.state.team.map((item, index)=>{
      return (
        <div key={index} className="followerTable">
          <button onClick={this.removeFollower.bind(this, index)} style={stylesObj.utilButton}>Actually No</button>
          <p>i'll put an animation here later</p>
          <table>
            <tr style={{fontSize: '1.5em'}}>
              <td>
                {item.name}
              </td>
              <td>
                @{item.screen_name}
              </td>
            </tr>
            <tr style={{fontSize: '2em'}}>
              <td style={{background: colorObj[item.subType], color: "white"}}>
                {item.subType}
              </td>
              <td style={{color: colorObj.turq.plain}}>
                {item.type}
              </td>
            </tr>
            <tr style={{fontSize: '2em'}}>
              <td style={{background: colorObj[item.subType], color: "white"}}>
                {item.stats.sub.toFixed(3)}
              </td>
              <td style={{color: colorObj.turq.plain}}>
                {item.stats.main.toFixed(3)}
              </td>
            </tr>
          </table>
        </div>);
    });

    return (
      <div>
        <p style={{fontSize: "2.2em"}}>{this.state.status}</p>
        {advance}
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
  console.log(type);
  switch (type){
    case "MagicWalrus":
      return "Wizard Walrus";
    case "StrengthWalrus":
      return "something something";
    case "StealthWalrus":
      return "something something";
    case "MagicRobot":
      return "something something";
    case "StealthRobot":
      return "something something";
    case "StrengthRobot":
      return "something something";
    case "MagicSponge":
      return "something something";
    case "StealthSponge":
      return "something something";
    case "StrengthSponge":
      return "something something";
  }
}

function checkExisting(obj, arr){
  for(var i = 0; i< arr.length; i++){
    if(obj.screen_name === arr[i].screen_name){
      return true;
    }
  }
  return false;
}
