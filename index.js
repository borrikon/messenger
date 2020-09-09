const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname, ''));

app.get('/', (req, res)=>{
   res.sendFile(__dirname +  '/index.html')
});

io.on('connection', (socket)=>{
    console.log('a user connected')
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg)
    })
})

http.listen(PORT, ()=>{
    console.log('server starts on port 3000')
});
