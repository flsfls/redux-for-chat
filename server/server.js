const express = require('express')
const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
    console.log("mongo connect success")
})
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true}
}))
// User.create({
//     user: 'imooc',
//     age: 18
// }, function(err, doc){
//     if (!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })
//新建app
const app = express()

app.get('/', function(req, res) {
    res.send('<h1>Hello World</h1>')
})

app.get('/data', function(req, res) {
    User.find({}, function(err, doc) {
        res.json(doc)
    })
    // res.json({name: 'imooc', type: 'ITt'})
})

app.listen(9093, function() {
    console.log("Node App at localhost: 9093")
})