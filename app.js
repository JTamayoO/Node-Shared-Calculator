var express = require('express'),
	app  = express(),
	server = require('http').createServer(app),
	io 	= require('socket.io').listen(server);


server.listen(process.env.PORT || 5000);

app.use(express.static( __dirname +'/public'));

app.get('/',function(req,res){
  res.sendfile( __dirname + '/index.html');
});



function EstadoCalc (display, expression)
{
  this.display = display;
  this.expression = expression;
  this.operando = [];
  this.operador = [];
}
var functions = 
{
  prod:'*',
  plus:'+',
  min:'-',
  div:'/'
};
estado = new EstadoCalc( '' ,'' );

io.on('connection', function(socket){
  console.log('a user connected state: ' + estado );
  io.emit('number', estado.display);
  io.emit('expression',estado.expression);

  socket.on('number', function(number){
    estado.display += number;
    io.emit('number', estado.display);
  });

  socket.on('message', function(msg){
  	  estado.display ++;
  		console.log('message: '+ msg + 'estadoCalc: ' + estado.display );
  		io.emit('message', msg);
  });


  //socket.on('unitfn',function())
  
  socket.on('binfn',function(msg){
    var result = 0;
    
     if(estado.operando.length === 0){
        estado.operando[0] = msg;
        estado.operador[0] = Number(estado.display);
        estado.display = ''; // No seguir concatenando
        io.emit('number','');
        estado.expression +=' '+ estado.operador[0] +' '+ functions[estado.operando[0]];
     }else{
        
        estado.operador[1] = Number(estado.display);
        switch(estado.operando[0]){
          case "plus":
            result = estado.operador[0] + estado.operador[1]; 
           break;
          case "min":
             result = estado.operador[0] - estado.operador[1]; 
          break;
          case "prod":
             result = estado.operador[0] * estado.operador[1]; 
          break;
          case "div":
              result = estado.operador[0] / estado.operador[1]; 
          break;
        }
        console.log(msg);
        estado.operador[0] = result;
        estado.operador[1] = null;
        estado.operando[0] = msg;
        estado.expression +=' '+ estado.display +' '+ functions[estado.operando[0]];
        estado.display = '';
        io.emit('number',result);
     }
     
     io.emit('expression', estado.expression);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected.');
  });
});

