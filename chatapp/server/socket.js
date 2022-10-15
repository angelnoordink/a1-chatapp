module.exports = {

    connect: function(io, PORT){
        var roomList=[];
        var socketRoom = [];
        var socketRoomNum = [];
        var joinedRoom = "";
        
        // const chat = io.of('/chat');

        io.on('connection',(socket) => {
            console.log('User connection on port '+ PORT + ' : ' + socket.id);

            socket.on('message', (message)=>{
                io.to(joinedRoom).emit('message', message);
            });

            socket.on('newRoom', (newRoom)=>{
                if (roomList.indexOf(newRoom) == -1 ) {
                    roomList.push(newRoom);
                    io.emit('roomList', JSON.stringify(roomList));
                }
            });

            socket.on('roomList', (rooms)=>{
                let roomList = [];
                roomList.push(rooms);
                io.emit('rooms', JSON.stringify(roomList));
                this.rooms = roomList;
            });

            socket.on('numUsers', (room)=>{
                var userCount = 0;

                for(i=0;i<socketRoomNum.length;i++){
                    if(socketRoomNum[i][0]== room){
                        userCount = socketRoomNum[i][1];
                    }
                }

                io.in(room).emit('numUsers', userCount);
            });

            socket.on('joinRoom', (room) => {
                joinedRoom = room;
                socket.join(room);
                socket.broadcast.to(room).emit('notice', `user has joined ${room.replace('_', ": ")}`);
                socket.emit('notice', "Welcome to the room");
            });


            socket.on("leaveRoom", (room)=> {
                for(let i=0; i<socketRoom.length; i++) {
                    if (socketRoom[i][0] == socket.id){
                        socketRoom.splice(i,1);
                        socket.leave(room);
                        io.to(room).emit("notice", "A user has left");
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