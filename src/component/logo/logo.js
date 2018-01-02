import React from 'react'

//图片路径可作为变量，为了避免ssr出现报错，需要改成require
// import logoImg from './job.png'
import './logo.css'

class Logo extends React.Component{
  render() {
    return (
      <div className="logo-container">
        <img src={require('./job.png')} alt="" />
      </div>
    )
  }
}

export default Logo
