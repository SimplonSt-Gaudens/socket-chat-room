console.log('hello')
var socket = io()
var chat  = io.connect('http://192.168.1.111:1337/chat');
var form = document.getElementById('form-message')
var chatInput = document.getElementById('chat')

form.addEventListener('submit', function(e){
	console.log('hello')
	e.preventDefault();
	chat.emit('message',  document.getElementById('chat-input').value)
})

chat.on("send-message", function(data){
	console.log(data);
	var li = document.createElement('li')
	li.textContent = data
	chatInput.append(li)
})
