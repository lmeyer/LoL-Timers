/* Author: Ludovic Meyer
 */

var io = require('socket.io').listen(8080)
var connected = {};

io.sockets.on('connection', function (socket) {

	/**
	 * Connected Control
	 */

	socket.on('disconnect', function(){
		socket.leave(socket.room);
		connected[socket.room] = connected[socket.room]-1
		io.sockets.in(socket.room).emit('connected', connected[socket.room])
	});

	/**
	 * Rooms Control
	 */

	socket.on('room', function(room) {
		if(socket.room) {
			socket.leave(socket.room);
			connected[room] = connected[room]-1
		}

		socket.room = room;

		if(!connected[socket.room]) {
			connected[socket.room] = 0;
		}

		socket.join(socket.room);
		connected[socket.room] = connected[socket.room]+1
		io.sockets.in(socket.room).emit('connected', connected[socket.room])
	});

	/**
	 * Countdown Control
	 */

	socket.on('launchCd', function(data){
		if(socket.room != '') {
			socket.broadcast.to(socket.room).emit('launchCd', data);
		}
	});
	socket.on('createWard', function(data){
		if(socket.room != '') {
			socket.broadcast.to(socket.room).emit('createWard', data);
		}
	});

});
