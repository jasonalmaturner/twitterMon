import { React, colorObj, stylesObj } from './../exportHub';

class TeamMember extends React.Component {
  render(){
    return (
      <div className="followerTable">
        <button onClick={this.props.remove} style={stylesObj.utilButton}>Actually No</button>
        <p>i'll put an animation here later</p>
        <table>
          <tr style={{fontSize: '1.5em'}}>
            <td>
              {this.props.mon.name}
            </td>
            <td>
              @{this.props.mon.screen_name}
            </td>
          </tr>
          <tr style={{fontSize: '2em'}}>
            <td style={{background: colorObj[this.props.mon.subType], color: "white"}}>
              {this.props.mon.subType}
            </td>
            <td style={{color: colorObj.turq.plain}}>
              {this.props.mon.type}
            </td>
          </tr>
          <tr style={{fontSize: '2em'}}>
            <td style={{background: colorObj[this.props.mon.subType], color: "white"}}>
              {this.props.mon.stats.sub.toFixed(3)}
            </td>
            <td style={{color: colorObj.turq.plain}}>
              {this.props.mon.stats.main.toFixed(3)}
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export { TeamMember };
