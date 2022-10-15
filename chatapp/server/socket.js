module.exports = {

    connect: function(io, PORT){
        var roomList=[];
        var socketRoom = [];
        var socketRoomNum = [];
        var joinedRoom = "";

        const chat = io.of('/chat');
        
        chat.on('connection',(socket) => {
            console.log('User connection on port '+ PORT + ' : ' + socket.id);

            // Event to send message back to the clients.
            socket.on('message', (message)=>{
                chat.to(joinedRoom).emit('message', message);
            });

            // User has requested to add a new room, check if it does not already exist.
            socket.on('newRoom', (newRoom)=>{
                if (roomList.indexOf(newRoom) == -1 ) {
                    roomList.push(newRoom);
                    chat.emit('roomList', JSON.stringify(roomList));
                }
            });

            // Event to send back a list of the current rooms.
            socket.on('roomList', (rooms)=>{
                let roomList = [];
                roomList.push(rooms);
                chat.emit('rooms', JSON.stringify(roomList));
                this.rooms = roomList;
            });

            // Return number of users in a room.
            socket.on('numUsers', (room)=>{
                var userCount = 0;

                for(i=0;i<socketRoomNum.length;i++){
                    if(socketRoomNum[i][0]== room){
                        userCount = socketRoomNum[i][1];
                    }
                }

                // Send back the count as a numuser event.
                chat.in(room).emit('numUsers', userCount);
            });

            // UPDATE
            socket.on('joinRoom', (room) => {
                joinedRoom = room;
                socket.join(room);
                socket.broadcast.to(room).emit('notice', `user has joined ${room.replace('_', ": ")}`);
                socket.emit('notice', "Welcome to the room");
            });


            // UPDATE
            socket.on("leaveRoom", (room)=> {
                for(let i=0; i<socketRoom.length; i++) {
                    if (socketRoom[i][0] == socket.id){
                        socketRoom.splice(i,1);
                        socket.leave(room);
                        chat.to(room).emit("notice", "A user has left");
                        socket.emit('notice', "A user has left");
                    }
                }

                for(let j=0; j<socketRoom.length; j++) {
                    if(socketRoomNum[j][0] == room) {
                        socketRoomNum[j][1] = socketRoomNum[j][1] -1;
                        if(socketRoomNum[j][1] ==0){
                            socketRoomNum.splice(j,1);
                        }
                    }
                
                }
                
            });

        });

    }

}