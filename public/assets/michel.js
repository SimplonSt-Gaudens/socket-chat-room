var socket = io();
var michel  = io.connect('http://192.168.1.111:1337/michel');

var form = document.getElementById('form-michel')
var chatInput = document.getElementById('chat')


form.addEventListener('submit', function(e){
	console.log('hello')
	e.preventDefault();
	michel.emit('message',  document.getElementById('chat-input-michel').value)
})

michel.on("send-message", function(data){
	console.log(data);
	var li = document.createElement('li')
	li.textContent = data
	chatInput.append(li)
})
