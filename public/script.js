const socket = io('/')


//creates a random user id
const myPeer = new Peer(undefined, {
    host: '/', 
    port: '3001'
})

myPeer.on('open', id =>{
    socket.emit('join-room', ROOM_ID, id)
})


socket.on('user-connected', userId => {
    console.log('User connected:' + userId)
})