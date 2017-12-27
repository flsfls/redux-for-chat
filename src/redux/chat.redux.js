import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')


const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsgs: [],
  users: {},
  unread: 0
}

export function chat(state=initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatmsgs: action.payload.msgs, users: action.payload.users, unread: action.payload.msgs.filter(v=>!v.read && v.to == action.userid).length}
      break;
    case MSG_RECV:
    console.log('a',action.payload)
    console.log('userid',action.userid)
      let n = action.payload.to == action.userid ? 1 : 0
      return {...state, chatmsgs:[...state.chatmsgs,action.payload], unread:state.unread+n}
    default:
      return state
      break;
  }
}

function msgList (msgs,users,userid) {
  return {type: MSG_LIST, payload: {msgs, users}, userid}
}

export function getMsgList() {
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist').then(res=>{
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id
        dispatch(msgList(res.data.msgs,res.data.users,userid))
      }
    })
  }
}

export function sendMsg({from,to,msg}) {
  return dispatch=>{
    socket.emit('sendmsg', {from, to, msg})
  }
}

function msgRecv(msg,userid) {
  return {type: MSG_RECV, payload: msg, userid}
}
export function recvMsg() {
  return (dispatch,getState)=>{
    socket.on('recvmsg',data=>{
      const userid = getState().user._id
      dispatch(msgRecv(data),userid)
    })
  }
}
