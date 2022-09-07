module.exports = {

    connect: function(io, PORT){
        var rooms=[ 'room1', 'room2', 'room3', 'room4' ];
        var socketRoom = [];
        var socketRoomNum = [];
        
        const chat = io.of('/chat');

        chat.on('connection',(socket) => {

            socket.on('message',(message)=>{
                for (i=0; i<socketRoom.length; i++){
                    if (socketRoom[i][0] == socket.id) {
                        chat.to(socketRoom[i][0]).emit('message', message);
                    }
                }
            });

            socket.on('newRoom', (newsroom)=>{
                if (rooms.indexOf(newRoom) == -1 ) {
                    rooms.push(newRoom);
                    chat.emit('rooms', JSON.stringify(rooms));
                }
            });

            socket.on('roomList', (m)=>{
                chat.emit('roomList', JSON.stringify(rooms));
                console.log(rooms);
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

            socket.on("joinRoom",(room)=>{
                
                if(rooms.includes(room)){
                    socket.join(room,()=>{

                        var inRoomSocketArray = false;

                        for(i=0; i<socketRoom.length;i++) {
                            if (socketRoom[i][0] == socket.id) {
                                socketRoom[i][1] = room;
                                inRoom = true;
                            }
                        }
                    if(inRoomSocketArray == false) {
                        socketRoom.push([socket.id, room]);
                        var hasRoomNum = false;
                        for (let j=0;j<socketRoomNum.length;j++) {
                            if(socketRoomNum[j][0] == room) {
                                socketRoomNum[j][1] = socketRoomNum[j][1] + 1;
                                hasRoomNum = true;
                            }
                        }
                        if (hasRoomNum == false) {
                            socketRoomNum.push([room,1]);
                        }
                    }

                        chat.in(room).emit("notice", "A new user has joined");

                    });
                    return chat.in(room).emit("joined", room);
                }
            });

            socket.on("leaveRoom", (room)=> {
                
                for(let i=0; i<socketRoom.length; i++) {
                    if (socketRoom[i][0] == socket.id){
                        socketRoom.splice(i,1);
                        socket.leace(room);
                        chat.to(room).emit("notice", "A user has left");
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

            socket.on('disconnect', ()=>{
                chat.emit("disconnect");
                for (let i=0; i<socketRoom.length; i++) {
                    if (socketRoom[i][0] == socket.room){
                        socketRoom.splice(i,1);
                    } 
                }
                for (let j=0; j < socketRoomNum.length; j++){
                    if(socketRoomNum[j][0] == socketRoom) {
                        socketRoomNum[j][1] = socketRoomNum[j][1] -1;
                    }
                }
                console.log("Client disconnected.")
            });
            
        });

    }

}