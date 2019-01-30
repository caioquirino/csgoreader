const fs = require('fs');
const CsgoDemoReader = require('./CsgoDemoReader');

function listDemoFiles() {
    return fs.readdirSync("./demos")
}

function emitter(socketio) {

    socketio.on('connection', function(socket) {
        console.log('a user connected');

        const eventListener = (ev, payload) => {
            console.log(`EVENT=${ev}, PAYLOAD=${JSON.stringify(payload)}`)
            socketio.emit(ev, payload)
        }

        const demo = new CsgoDemoReader(eventListener)


        socket.on('listDemoFiles', function(payload) {
            console.log('listDemoFiles');
            socketio.emit('listDemoFiles', listDemoFiles().filter((x) => x.endsWith(".dem")))
        });

        socket.on('start', function(payload) {
            console.log('start');
            demo.start(payload)
            socketio.emit('start', true)
        });
    });



}

module.exports = emitter