import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'

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
    this.props.getMsgList()
    this.props.recvMsg()
    console.log('zui',this.props)
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
    const user = this.props.match.params.user
    const Item = List.Item
    // <p key={v._id}>对方发来的{v.content}</p>
    // <p key={v._id}>我发送的{v.content}</p>
    return (
      <div id="chat-page">
        <NavBar mode="dark">
          {user}
        </NavBar>
        {this.props.chat.chatmsgs.map(v=>{
            return v.from == user ? (
              <List key={v._id}>
                <Item>{v.content}</Item>
              </List>
            ) :(<List key={v._id}>
                  <Item className="chat-me">{v.content}</Item>
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
