/* Author: Ludovic Meyer
 */

var io = require('socket.io').listen(8080)
var connected = {};
var default_room = 'default';
function totalize(arr){
	var key, count = 0;
	for(key in arr) {
		count += arr[key];
	}
	return count;
};

io.set('log level', 1); // reduce logging
io.sockets.on('connection', function (socket) {

	/**
	 * Connected Control
	 */

	socket.on('disconnect', function(){
		socket.leave(socket.room);
		connected[socket.room] = connected[socket.room]-1
		if(!connected[socket.room]) {
			delete connected[socket.room];
		}
		io.sockets.in(socket.room).emit('connected', connected[socket.room])
		console.log('rooms :' + Object.keys(connected).length);
		console.log('total :' + totalize(connected));
		console.log(connected);
		console.log('---------------------------------------');
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

		if(!connected[socket.room]) {
			connected[socket.room] = 0;
		}

		socket.join(socket.room);
		connected[socket.room] = connected[socket.room]+1
		io.sockets.in(socket.room).emit('connected', connected[socket.room]);
		if(socket.room != default_room) {
			socket.broadcast.to(socket.room).emit('join');
		}
		console.log('rooms :' + Object.keys(connected).length);
		console.log('total :' + totalize(connected));
		console.log(connected);
		console.log('---------------------------------------');
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
