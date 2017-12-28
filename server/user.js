const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model =  require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'__v':0}

// Chat.remove({},function(err,doc){})
//用来查看数据库的用户列表
Router.get('/list', function(req, res) {
  // User.remove({},function(err,doc){})
  const {type} = req.query
  User.find({type}, function(err, doc) {
    return res.json({code: 0, data: doc})
  })
})

Router.get('/info', function(req, res) {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code:1})
  }
  User.findOne({_id:userid}, _filter, function(err, doc){
    if (err) {
			return res.json({code:1, msg:'后端出错了'})
		}
		if (doc) {
			return res.json({code:0,data:doc})
		}
  })

})

Router.post('/login', function(req,res){
	const {user, pwd} = req.body
	User.findOne({user, pwd:md5Pwd(pwd)}, _filter,function(err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})

Router.post('/register', function(req, res){
	const {user, pwd, type} = req.body
	User.findOne({user}, function(err, doc) {
    if (doc) {
      return res.json({code:1, msg: '用户名重复'})
    }
    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save(function(e, d) {
      if (e) {
				return res.json({code:1,msg:'后端出错了'})
			}
			const {user, type, _id} = d
      //存cookie
      res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
    })
  })
})

Router.post('/update', function(req,res) {
  const userid = req.cookies.userid
  if (!userid) {
    return json.dumps({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

Router.get('/getmsglist', function(req,res) {
  const userid = req.cookies.userid

  if (!userid) {
    return json.dumps({code:1})
  }
  let users = {}
  User.find({},function(err, doc) {
    doc.forEach(v=> {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
  })
  //$or表示多条件查询
  Chat.find({'$or':[{from:userid}, {to:userid}]}, function(err,doc) {
    return res.json({code: 0, msgs: doc, users})
  })
})
function md5Pwd(pwd) {
  const salt = 'flsloveldw'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
