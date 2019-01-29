const socket = io(window.location.protocol+'//'+window.location.hostname+':3001');


const registerListener = (listener) => {
  socket.on('listDemoFiles', (msg) => {
    listener('listDemoFiles', msg)
  })
  socket.on('player_death', (msg) => {
    listener('player_death', msg)
  })
}


const csgoreader = {
  listener: {
    add: (listener) => registerListener(listener)
  },
  commands: {
    listDemoFiles: () => socket.emit('listDemoFiles', '')
  }

}



