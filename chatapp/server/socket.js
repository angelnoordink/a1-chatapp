module.exports = {

    connect: function(io, PORT){
        var groups=[];
        var roomList=[];
        var socketRoom = [];
        var socketRoomNum = [];
        var joinedRoom = "";
        
        const chat = io.of('/chat');

        chat.on('connection',(socket) => {
            console.log('User connection on port '+ PORT + ' : ' + socket.id);

            socket.on('message', (message)=>{
                chat.to(joinedRoom).emit('message', message);
            });

            socket.on('newRoom', (newRoom)=>{
                if (roomList.indexOf(newRoom) == -1 ) {
                    roomList.push(newRoom);
                    chat.emit('roomList', JSON.stringify(roomList));
                }
            });

            socket.on('roomList', (rooms)=>{
                let roomList = [];
                roomList.push(rooms);
                chat.emit('rooms', JSON.stringify(roomList));
                this.rooms = roomList;
            });

            socket.on('getGroups', (data) => {
                let groups = [];
                data.groupList.forEach((group) => {
                    groups.push({group_id: group.group_id, group_name: group.group_name, role: group.role, rooms: group.rooms});
                });
                localStorage.setItem("groups", JSON.stringify(groups));
                this.groups = groups;
            });

            socket.on('numUsers', (room)=>{
                var userCount = 0;

                for(i=0;i<socketRoomNum.length;i++){
                    if(socketRoomNum[i][0]== room){
                        userCount = socketRoomNum[i][1];
                    }
                }

                chat.in(room).emit('numUsers', userCount);
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
            

            // socket.on('disconnect', ()=>{
            //     chat.emit("disconnect");
            //     for (let i=0; i<socketRoom.length; i++) {
            //         if (socketRoom[i][0] == socket.room){
            //             socketRoom.splice(i,1);
            //         } 
            //     }
            //     for (let j=0; j < socketRoomNum.length; j++){
            //         if(socketRoomNum[j][0] == socketRoom) {
            //             socketRoomNum[j][1] = socketRoomNum[j][1] -1;
            //         }
            //     }
            //     console.log("Client disconnected.")
            // });
            
        });

    }

}