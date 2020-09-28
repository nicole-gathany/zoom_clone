const socket = io('/')
const videoGrid = document.getElementById('video-grid')

//creates a random user id
const myPeer = new Peer(undefined, {
    host: '/', 
    port: '3001'
})

const myVideo = document.createElement('video')
myVideo.muted = true; //because we don't have to listen to our own video (muted for self)

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
    })

    socket.on('user-connected', userId =>{
        //when a new user connects
        connectToNewUser(userId, stream)

    })
})

myPeer.on('open', id =>{
    socket.emit('join-room', ROOM_ID, id)
})


function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () =>{
        video.play()
    })
    videoGrid.append(video)
}

function connectToNewUser(userId, stream){
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () =>{
        video.remove()
    })
}