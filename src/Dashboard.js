import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Redirect} from 'react-router-dom'
import { Button } from 'antd-mobile'

import { logout, getUserData } from './Auth.redux'

@connect(state=>({auth: state}), {logout,getUserData})

class Dashboard extends React.Component{
  componentDidMount() {
    this.props.getUserData()
  }

  render() {
    const redirectToLogin = <Redirect to='/login'></Redirect>
    const app = (
			<div>
        <h2>我的名字是{this.props.auth.user}, 年龄{this.props.auth.age}</h2>
				<h1>独立团</h1>
        {this.props.auth.isAuth? <Button type="primary" onClick={this.props.logout}>注销</Button>:null}
			</div>
		)
    return this.props.auth.isAuth ? app: redirectToLogin
  }
}

export default Dashboard
