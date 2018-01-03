import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'

const Chat = model.getModel('chat')

import path from 'path'
const app = express()

//对css处理
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
assethook({
    extensions: ['png','ico']
})

import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
//把BrowserRouter=>staticRouter
import { StaticRouter } from 'react-router-dom'
import { renderToString, renderToStaticMarkup} from 'react-dom/server'
import App from '../src/App.js'
import reducers from '../src/reducer'
import staticPath from '../build/asset-manifest.json'


//React组件=>div

// function App() {
//   return (
//     <div>
//       <h2>server render</h2>
//       <p>imooc</p>
//     </div>
//   )
//
// }
// console.log(App())
// console.log(renderToString(<App></App>))

//work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function(socket) {
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
  const store = createStore(reducers, compose(
  	applyMiddleware(thunk)
  ))
  let context = {}
  const markup = renderToString(
    <Provider store={store}>
  		<StaticRouter
        location={req.url}
        context={context}>
  			<App></App>
  		</StaticRouter>
  	</Provider>
  )
  const obj = {
    '/msg': 'React聊天信息列表',
    '/boss': 'boss查看牛人列表页面'
  }
  const pagehtml = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <title>React App</title>
      <link rel="stylesheet" href="/${staticPath['main.css']}">
      <meta name="description" content="${obj[req.url]}">
    </head>
    <body>
      <div id="root">${markup}</div>
      <script src="/${staticPath['main.js']}"></script>
    </body>
  </html>`
  // const htmlres = renderToString(<App></App>)
   res.send(pagehtml)

  // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093, function(){
  console.log('Node app start at port 9093')
})
