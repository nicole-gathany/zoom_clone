const socket = io('/')
const myPeer = new Peer(undefined, {
    host: '/', 
    port: '3001'

})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})




//rooms are still not connecting for some reason. I will need to go back and look tomorrow. 
socket.on('user-connected', userId => {
    console.log('User connected: ' + userId )
})