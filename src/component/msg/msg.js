import React from 'react'
import { connect } from 'react-redux'
import { List, WhiteSpace, Badge } from 'antd-mobile'

@connect(state=>state)

class Msg extends React.Component {
  constructor(props) {
    super(props)
  }
  getLast(arr) {
    return arr[arr.length-1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id

    const msgGroup = {}
    this.props.chat.chatmsgs.forEach(v=> {
      // debugger
      //按key值合并数组
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })

    const chatList = Object.values(msgGroup).sort((a,b)=> {
      const a_last = this.getLast(a).creatTime
      const b_last = this.getLast(b).creatTime
      return b_last - a_last
    })
    const userinfo = this.props.chat.users
    //eslint代码校验工具
    //react16特有的错误处理机制
    //react性能优化
    return (
      <div>

          {chatList.map(v=>{
            const lastItem = this.getLast(v)
            //是为了显示最新发送或接收的消息

            const targetId = v[0].from == userid ? v[0].to : v[0].from
            const name = userinfo[targetId] && userinfo[targetId].name
            let avatar = userinfo[targetId] && userinfo[targetId].avatar
            avatar = avatar ? avatar : ''
            const unreadNum = v.filter(value=> !value.read && value.to === userid).length
            return (
              <List key={lastItem._id}>
                <Item
                  extra={<Badge text={unreadNum}></Badge>}
                  // thumb={require(`../img/${avatar}.png`)}
                  arrow="horizontal"
                  onClick={()=>{
                    this.props.history.push(`/chat/${targetId}`)
                  }}>
                    {lastItem.content}
                    <Brief>{name}</Brief>
                </Item>
              </List>
            )
          })}

      </div>
    )
  }
}
export default Msg
