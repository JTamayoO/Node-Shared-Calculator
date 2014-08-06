var express = require('express'),
	app  = express(),
	server = require('http').createServer(app),
	io 	= require('socket.io').listen(server);

server.listen(5000,function(){
	console.log('Listening on port %d', server.address().port);
});

app.use(express.static( __dirname +'/public'));

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('message', function(msg){
  	
  		console.log('message: '+ msg);
  		io.emit('message', msg);
  });

  socket.on('fn',function(msg){
  	
  });

  socket.on('disconnect', function(){
    console.log('user disconnected.');
  });
});

app.get('/',function(req,res){
	res.sendfile( __dirname + '/index.html');
});