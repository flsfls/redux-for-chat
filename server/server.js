import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'

const Chat = model.getModel('chat')

import path from 'path'
const app = express()

import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
//把BrowserRouter=>staticRouter
import { staticRouter } from 'react-router-dom'
import { renderToString, renderToStaticMarkup} from 'react-dom/server'
// import AppRender from '../src/App.js'
//React组件=>div

function App() {
  return (
    <div>
      <h2>server render</h2>
      <p>imooc</p>
    </div>
  )

}
// console.log(App())
console.log(renderToString(<App></App>))

//work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function(socket) {
  // console.log('user login')

  //bug
  // io.on('sendmsg', function(data) {
  //   console.log(data)
  // })

  socket.on('sendmsg', function(data) {
     const {from, to, msg} = data
     const chatid = [from, to].sort().join('_')
     Chat.create({chatid, from, to, content:msg}, function(err,doc) {
       io.emit('recvmsg',Object.assign({},doc._doc))
     })
     // io.emit('recvmsg', data)
  })
})

const userRouter = require('./user')


app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)
// app.listen(9093, function(){
//   console.log('Node app start at port 9093')
// })
//中间件
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  // const htmlres = renderToString(<App></App>)
  // res.send(htmlres)
  // console.log('path',path.resolve('build/index.html'))
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093, function(){
  console.log('Node app start at port 9093')
})
