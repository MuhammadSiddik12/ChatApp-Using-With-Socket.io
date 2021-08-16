const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})
require('dotenv').config()

io.on('connection', (socket) => {
    console.log('connection made successfully')
    socket.on('message', (payload) => {
        console.log('message received on server', payload);
        io.emit('message', payload)
    })
})

server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})