import { React, stylesObj, colorObj, axios, Router } from './../exportHub';

class Initiate extends React.Component {
  constructor(){
    this.state = {
      team: [],
      status: 'Search for a follower'
    };
  }

  addToTeam(follower){
    this.setState({
      team: this.state.team.concat([follower])
    });
  }

  handleKeyDown(e){
    if(e.keycode === 13){
      this.findFollower(this.refs.getDOMNode().value);
    }
  }

  findFollower(name){
    axios.get(`/api/mondata?monname=${name}`).then((data)=>{
      this.setState({
        team: this.state.team.concat([data.data.follower]),
        status: getStatus(data.data.follower.subtype + data.data.follower.type)
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
    var followerTeam = this.state.team.map(function(item, index){
      return <div id={index}>
              <button onClick={this.removeFollower.bind(this)} style={stylesObj.utilButton}>Actually No</button>
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
        <input ref="screen_name" placeholder="Screen Name" onKeyDown={this.handleKeyDown}/>
        {followerTeam}

      </div>
    );
  }
}

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
