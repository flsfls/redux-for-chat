import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addGunAsync, removeGun, addGun } from './index.redux'
// import { Button } from 'antd-mobile'

@connect(
  state=>({num: state}),
  {addGun, removeGun, addGunAsync}
)
class App extends Component {
  render() {
    return (
      <div>
        <h2>现在有机枪{this.props.num}把</h2>
        <button onClick={this.props.addGun}>申请武器</button>
        <button onClick={this.props.removeGun}>上交武器</button>
        <button onClick={this.props.addGunAsync}>拖两天再给</button>
      </div>
    );
  }
}

// const mapStatetoProps = (state)=> {
//   return {num: state}
// }
// const actionCreators = {addGunAsync, removeGun, addGun}
// App = connect(mapStatetoProps, actionCreators)(App)
export default App;
