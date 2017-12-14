import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'antd-mobile'

import { login } from './Auth.redux'

@connect(state=>({auth:state}),
        {login}
      )
class Auth extends React.Component{


  render() {
    return (
      <div>
        {this.props.auth.isAuth ? <Redirect to='/dashboard' /> : null}
        <h2>你没有权限，需要登录</h2>
        <Button type="primary" onClick={this.props.login}>登录</Button>
      </div>
    )
  }
}

export default Auth
