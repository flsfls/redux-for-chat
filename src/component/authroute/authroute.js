import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(state=>({user: state.user}), {loadData})
//用于向后台请求用户信息，判断跳转登录还是注册路由
class AuthRoute extends React.Component {
  componentDidMount() {
    console.log('AuthRoute-user', this.props.user)

    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
     if (publicList.indexOf(pathname) > -1) {
       return null
     }

    axios.get('/user/info').then(res => {
      console.log('res', res)
      if (res.status === 200) {
        if (res.data.code === 0) {
          //有登录信息，向redux存储
          this.props.loadData(res.data.data)
        } else {
          //跳转到登录
          this.props.history.push('/login')
        }
      }
    })
  }
  render() {
    return null
  }
}
export default AuthRoute
