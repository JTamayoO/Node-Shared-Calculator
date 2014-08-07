var socket = io();

$('button').click(function(e){
	var idClicked = e.target.id;
	var clickedVal =  $('#'+idClicked).attr("value");	
	//socket.emit('message',$('#messages').text().trim() + clickedVal);
	if (!isNaN(clickedVal)) {
		socket.emit( 'number', clickedVal );
	}else{
		switch(idClicked){
			case "btn_eq":
			break;
			default:
				socket.emit('binfn', clickedVal);
			break;
		}
	}
});

$('form').submit(function(){
	socket.emit('message', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('number', function(msg){
	$('#messages').html($('<ul class="display" id="messages">').text(msg));
});

socket.on('expression', function(exp){
	$('#expression').html($('<ul class="expression">').text(exp));
});