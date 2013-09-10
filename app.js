/* Author: Ludovic Meyer
 */

var io = require('socket.io').listen(8080)
var connected = {};
var default_room = 'default';
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

		if(room == '' || room == '#helpModal' || room == '#commentModal' || room == '#syncModal') {
			room = default_room;
		}
		socket.room = room;
		console.log(socket.room);


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
		if(socket.room != default_room) {
			socket.broadcast.to(socket.room).emit('launchCd', data);
		}
	});
	socket.on('createWard', function(data){
		if(socket.room != default_room) {
			socket.broadcast.to(socket.room).emit('createWard', data);
		}
	});

});
