import React from 'react'
//用来获取redux的state,action
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

import Logo from '../../component/logo/logo'
import { login } from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form.js'


// function WrapperHello(Comp) {
//   class WrapComp extends React.Component {
//     render() {
//       return (
//         <div>
//           <p>before</p>
//           <Comp name='text' {...this.props}></Comp>
//           <p>after</p>
//         </div>
//       )
//     }
//   }
//   return WrapComp
// }
//
// // Hello = WrapperHello(Hello)
// @WrapperHello
// class Hello extends React.Component {
//   render() {
//     return (
//       <div>this is Hello</div>
//     )
//   }
// }

@connect(state=>state.user, {login})
@imoocFrom     //focus
class Login extends React.Component{
  constructor(props) {
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: ''
    // }
  }

  // handleChange(key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }
  handleLogin() {
    this.props.login(this.props.state)
    console.log('lstate', this.props)
  }

  register() {
    this.props.history.push('/register')
  }
  render() {
    return(
      <div>
      {this.props.redirectTo && this.props.redirectTo !=='/login'? <Redirect to={this.props.redirectTo} />:null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={v=>this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace />
            <InputItem onChange={v=>this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin.bind(this)}>登录</Button>
          <WhiteSpace />
          <Button type='primary' onClick={()=>this.register()}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login
