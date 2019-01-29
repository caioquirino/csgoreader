const express = require('express')
const socket_emitter = require('./src/main/socket_emitter')

const app = express()

const staticFiles = () => {
  const port = 3000

  app.use(express.static('public'))


  const http = require('http').Server(app);

  http.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

const websocketServer = () => {
  const port = 3001

  const http = require('http').Server(app);
  const io = require('socket.io')(http);

  socket_emitter(io);


  http.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

staticFiles()
websocketServer()

module.exports = app;