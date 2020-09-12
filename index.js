
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000

let users = []

app.use(express.static(__dirname, ''));

app.get('/', (req, res)=>{
   res.sendFile(__dirname +  '/index.html')
});

io.on('connection', (socket)=>{    

    socket.on('new user', (name)=>{
        socket.broadcast.emit('new user connected', name);
        let id = socket.id
        users.push({name, id})
    })

    socket.on('disconnect', ()=>{

    })
    socket.on('chat message', (msg, name)=>{
        io.emit('chat message', msg, name)
    })
})


http.listen(PORT, ()=>{
    console.log('server starts on port 3000')
});


// var firebaseConfig = {
//     apiKey: "AIzaSyAsg23RrkZiF3iYvEC5eIz3pD6K4_oNO80",
//     authDomain: "messenger-da0e2.firebaseapp.com",
//     databaseURL: "https://messenger-da0e2.firebaseio.com",
//     projectId: "messenger-da0e2",
//     storageBucket: "messenger-da0e2.appspot.com",
//     messagingSenderId: "138366484369",
//     appId: "1:138366484369:web:781c4a2642ff762429e430"
//   };
// firebase.initializeApp(firebaseConfig);
// var db = firebase.database();

// function addUser(userName){
//     db.ref('users/').child('userNames').set(userName)
// }