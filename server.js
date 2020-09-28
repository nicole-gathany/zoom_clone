const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

//home page

app.get('/', (req, res) =>{
    res.redirect(`/${uuidV4()}`)
})

//room

app.get('/:room', (req, res) =>{
    res.render('room', { roomId: req.params.room })
})

//connects anytime someone connects to our webpage
io.on('connection', socket => {
    //anytime we join a room, we get a roomId and a userId
    socket.on('join-room', (roomId, userId) =>{
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
    }) 
})

server.listen(3000)