import React from 'react'
import { connect } from 'react-redux'

@connect(state=>state)

class Msg extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    const msgGroup = {}
    this.props.chat.chatmsgs.forEach(v=> {
      // debugger
      //按key值合并数组
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    console.log('msgGroup',msgGroup)
    return (
      <div>

      </div>
    )
  }
}
export default Msg
