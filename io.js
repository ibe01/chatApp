var express = require('express');
var app = express();
var sock = require('socket.io');
var path = require('path');
var port = process.env.PORT || 3000;

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/pub/index.html'));
});


var server = app.listen(port, function() {
	console.log("listening..... on port " + port);
});

var io = sock(server);

io.on('connection', function(socket) {
	   console.log("socket.io connected.."+socket.id);

	   socket.on('chat', function(data) {
	   io.emit('chat',data);
		console.log(socket.id);
	   });

	   socket.on('type', function(data) {
	   socket.broadcast.emit('type',data);
	   });
});
