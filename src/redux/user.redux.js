import axios from 'axios'

import {getRedirectPath} from '../util'

const LOAD_DATA = 'LOAD_DATA'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'


const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}

//reducer
export function user(state=initState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {...state, ...action.payload}

    case LOGIN_SUCESS:
      return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
    case ERROR_MSG:
      return {...state, msg:action.msg}
    case REGISTER_SUCCESS:
      return {...state, msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
    default:
      return state
  }
}

export function loadData(data) {
  return {type: LOAD_DATA, payload: data}
}

function loginSuccess(data) {
  console.log('data', data)
  return {type:LOGIN_SUCESS, payload: data}
}

function errorMsg(msg) {
  return {msg, type:ERROR_MSG}
}

function registerSuccess(data){
	return { type:REGISTER_SUCCESS, payload:data}
}

export function login({user,pwd}){
	if (!user||!pwd) {
		return errorMsg('用户密码必须输入')
	}
	return dispatch=>{
		axios.post('/user/login',{user,pwd})
			.then(res=>{
				if (res.status==200&&res.data.code===0) {
					// dispatch(registerSuccess({user,pwd,type}))
					dispatch(loginSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function register({user,pwd,repeatpwd,type}) {
  if (!user||!pwd||!type) {
		return errorMsg('用户名密码必须输入')
	}
	if (pwd!==repeatpwd) {
		return errorMsg('密码和确认密码不同')
	}
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type}).then(res=>{
      if (res.status===200&&res.data.code===0) {
        dispatch(registerSuccess({user,pwd,type}))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
