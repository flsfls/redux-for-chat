import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
import { getChatId } from '../../util'


const socket = io('ws://localhost:9093')
// socket.on('recvmsg', function(data) {
//   console.log(data)
// })
@connect(state=>state, {getMsgList, sendMsg, recvMsg})
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    //跨域，需要手动连接
    // const socket = io('ws://localhost:9093')

    if (!this.props.chat.chatmsgs.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}

    console.log('props',this.props)
    // socket.on('recvmsg', (data)=>{
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }
  handleSubmit() {
    // socket.emit('sendmsg', {text: this.state.text})
    // this.setState({text:''})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: ''})
  }
  render() {
    const from = this.props.user._id
    const user = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users

    const chatmsgs = this.props.chat.chatmsgs.filter(v=>getChatId(from,user) == v.chatid)
    return (
      <div id="chat-page">
        <NavBar
                mode="dark"
                icon={<Icon type='left'></Icon>}
                onLeftClick={()=>{this.props.history.goBack()}}
        >
          {users[user] ? users[user].name : ''}
        </NavBar>
        {chatmsgs.map((v,i)=>{
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from == user ? (
              <List key={i}>
                <Item
                      thumb={avatar}>{v.content}</Item>
              </List>
            ) :(<List key={i}>
                  <Item
                        className="chat-me"
                        extra={<img src={avatar} />}>{v.content}</Item>
                </List>)
        })}
        <div className="stack-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}>
              </InputItem>
            </List>
          </div>
      </div>
    )
  }
}

export default Chat
