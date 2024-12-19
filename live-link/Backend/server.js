const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = http.createServer(app);

// Socket.IO server
const io = new socketIO.Server(httpServer, { cors: { origin: '*' }, connectionStateRecovery: {} });

// Room set to track active rooms
const Rooms = new Set();
const ChatsData = {}
const ClientRooms = {}

io.on("connection", (socket) => {

    // Handle room creation
    socket.on("createRoom", (nickname, callback) => {
        const roomCode = Math.random().toString(32).slice(2, 8);
        if (!Rooms.has(roomCode)) {
            Rooms.add(roomCode);
            ChatsData[roomCode] = []
            ClientRooms[socket.id] = [roomCode, nickname]
            socket.join(roomCode);
            callback({ status: "success", roomCode });
        } else {
            callback({ status: "failed" });
        }
    });

    // Handle room joining
    socket.on("joinRoom", (nickname, roomCode, callback) => {
        if (Rooms.has(roomCode)) {
            socket.join(roomCode);
            ClientRooms[socket.id] = [roomCode, nickname]
            callback({ status: "success" });
        } else {
            callback({ status: "failed" });
        }
    });

    // Handle user joining the chat in a room
    socket.on("joined", (nickname, roomCode) => {
        try{

            socket.emit("old-chats", ChatsData[roomCode])
            ChatsData[roomCode].push({ nickname: "System", message: `${nickname} joined the chat.` })
            io.to(roomCode).emit("joined", nickname);
        }catch(err){
            console.log("Error")
        }
    });

    // Handle message sending to room
    socket.on("message", (nickname, message, roomCode, senderID) => {
        ChatsData[roomCode].push({ nickname, message, senderID })
        io.to(roomCode).emit("message", nickname, message, senderID);
    });

    // Disconnect handler (optional)
    socket.on("disconnect", () => {
        const [roomCode, nickname] = ClientRooms[socket.id] || [];
        if (roomCode) {
            io.to(roomCode).emit("left-room", nickname);
            delete ClientRooms[socket.id];
        }
        if (ChatsData[roomCode].length==0){
            delete ChatsData[roomCode]
            Rooms.delete(roomCode)
        }
    });
    
});

// Start the server
httpServer.listen(PORT, () => {
    console.log("Server started on port", PORT);
});
