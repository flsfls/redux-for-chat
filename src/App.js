import React, { Component } from 'react';
// import { Button } from 'antd-mobile'

class App extends Component {
  render() {
    const boss = '李云龙'
    return (
      <div className="App">
        <h1>{boss}</h1>
        <Oneclass></Oneclass>
      </div>
    );
  }
}

// import { addGun } from './index.redux.js'
// <Button onClick={()=>store.dispath(addGun())}></Button>

class Oneclass extends Component {
  render() {
    const boss = 'hi'
    return (
      <div>
        <h2>{boss}</h2>
      </div>
    )
  }
}
export default App;
