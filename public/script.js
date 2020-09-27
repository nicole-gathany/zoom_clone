const socket = io('/')
// const myPeer = new Peer(undefined, {
//     host: '/', 
//     port: '3001'

// })

//is making the app crash, but i also am not connected to the room, 
//i think i may have to kill the peer server and restart it
// myPeer.on('open', id => {
//     socket.emit('join-room', ROOM_ID, id)
// })




//rooms are still not connecting for some reason. I will need to go back and look tomorrow. 
socket.on('user-connected', userId => {
    console.log('User connected: ' + userId )
})