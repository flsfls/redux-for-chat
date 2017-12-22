import React from 'react'
import {NavBar} from 'antd-mobile'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'

function Msg() {
  return <h1>this is Msg Page</h1>
}

function User() {
  return <h1>this is User Page</h1>
}

@connect(state=>state)
class Dashboard extends React.Component{
  constructor(props) {
    super(props)
    this.state={}
  }
  render() {
    const {user} = this.props
    const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type=='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type=='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]
    const {pathname} = this.props.location
    return (
      <div>
        <NavBar className='fixed-header' mode='dard'>
          {navList.find(v=>v.path==pathname).title}
        </NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}
export default Dashboard
