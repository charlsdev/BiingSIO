require('dotenv').config();

require('./database');

const WebSocketServer = require('socket.io');
const http = require('http');
const app = require('./server');
const server = http.createServer(app);

// Config de SocketIO
const Sockets = require('./socketio');

const httpServer = server.listen(app.get('port'), () => {
   console.log(
      `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] - Servidor en el puerto ${app.get('port')}`
   );
});

const io = WebSocketServer(httpServer);

Sockets(io);