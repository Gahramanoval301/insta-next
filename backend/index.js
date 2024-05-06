const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`user is connected to ${socket.id}`);

    socket.on("send_message", (data) => {
        console.log(`data from ${socket.id}: ${data.message}`);
        io.emit("receive_message", data); // Changed to io.emit to send to all users including sender
    });

    socket.on("disconnect", () => {
        console.log(`user is disconnected from ${socket.id}`);
    });

});

server.listen(3001, () => {
    console.log(`Server is running on port 3001...`);
});
