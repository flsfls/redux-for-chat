import React from 'react'
import {NavBar,InputItem, TextareaItem, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {updateinfo} from '../../redux/user.redux'

@connect(state=>state.user, {updateinfo})
class GeniusInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    const redirectTo = this.props.redirectTo
    return(
      <div>
        {redirectTo ? <Redirect to={redirectTo} /> : ''}
        <NavBar mode="dark" >牛人完善信息页</NavBar>
        <AvatarSelector selectAvatar={(imgname)=>this.setState({
          avatar: imgname
        })}></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title',v)}>
					求职岗位
				</InputItem>

				<TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='个人简介'
				>

				</TextareaItem>
				<Button
					type='primary' onClick={()=>this.props.updateinfo(this.state)}>保存</Button>
      </div>
    )
  }
}

export default GeniusInfo
