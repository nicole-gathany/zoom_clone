const express = require('express');
const app = express();
//allows a server to be used with socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidv4 } = require('uuid')

//Setting up express servers
//ejs is the library we added earlier when downloading dependencies and how the views will be rendered
app.set('view engine', 'ejs')
//javascript and css will go into the public folder
app.use(express.static('public'))


//for the get route
//req is request
//res is response
app.get('/', (req, res) => {
    //will give us a random uuid
    //random rooms
    res.redirect(`/${uuidv4()}`)
})

//routes for rooms
app.get('/:room',  (req, res) => {
    res.render('room', {roomId: req.params.room})
})

io.on('connection', socket =>{
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
    })
})

server.listen(3000)