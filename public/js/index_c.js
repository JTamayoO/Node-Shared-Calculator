var socket = io();


$('button').click(function(e){
	var idClicked = e.target.id;
	socket.emit('message', $('#'+idClicked).attr("value"));
});

$('form').submit(function(){
	socket.emit('message', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('message', function(msg){
	$('#messages').html($('<ul class="display" id="messages">').text(msg));
});