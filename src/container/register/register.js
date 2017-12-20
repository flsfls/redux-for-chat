import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'

import Logo from '../../component/logo/logo'
import {register} from '../../redux/user.redux'

@connect(state=>state.user, {register})

class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    }
  }
	handleChange(k, val) {
		this.setState({
			[k]: val
		})
	}
	handleRegister() {
		this.props.register(this.state)
	}
   render() {
     const RadioItem = Radio.RadioItem
     return(
       <div>
			 		{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null }
          <Logo></Logo>
          <List>
            <InputItem onChange={(v)=>this.handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace />
            <InputItem onChange={(v)=>this.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace />
            <InputItem onChange={(v)=>this.handleChange('repeatpwd', v)}>确认密码</InputItem>
            <WhiteSpace />
            <RadioItem
							checked={this.state.type === 'genius'}
							onChange={()=>this.handleChange('type', 'genius')}>牛人</RadioItem>
            <RadioItem
							checked={this.state.type === 'boss'}
							onChange={()=>this.handleChange('type', 'boss')}>BOSS</RadioItem>
            <WhiteSpace />
            <Button type='primary' onClick={()=>this.handleRegister()}>注册 </Button>
          </List>
       </div>
     )
   }
}

export default Register
