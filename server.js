var express = require('express')
var app = express()
var http = require('http').createServer(app)
var bodyParser = require('body-parser')
var ent = require('ent')
var io = require('socket.io')(http)
var cors = require('cors')

app.set('view engine', 'pug')

app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.render('hello')
})

app.get('/michel', function(req, res){
	res.render('michel')
})

var chat = io
	.of('/chat')
	.on('connection', function(socket){
		console.log('user is connected !');
		socket.on('disconnect', function(){
			console.log('user is disconnected !')
		})

		socket.on('message', function(data){
			console.log('message send')
			var msg = ent.encode(data)
			chat.emit('send-message', msg)
		})
	})

var michel = io
	.of('/michel')
	.on('connection', function(socket){
		console.log('user is connected !');
		socket.on('disconnect', function(){
			console.log('user is disconnected !')
		})

		socket.on('message', function(data){
			console.log('message send')
			var msg = ent.encode(data)
			michel.emit('send-message', msg)
		})
	})


http.listen(1337, function(){
	console.log('Listen port 1337')
})