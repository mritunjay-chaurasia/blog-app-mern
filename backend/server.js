const express = require('express');
const app = express();
require('dotenv').config();
const http = require('http');
const connectDB = require('./config/mongoose');
connectDB()
const rotuer = require('./routers/index');
const PORT = process.env.PORT || 5000
const HOST_NAME = process.env.HOST_NAME
// cors allow access data from one domain to another domain
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
const { Server } = require("socket.io");
// corsOptions allows requests only from the domain specified 
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true
};
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', rotuer);

app.get('/', (req, res) => {
  res.send("Hello from Node.js API")
})

const server = http.createServer(app)

//pingTimeout => If the server doesn’t receive a (pong)response from the client in 30 seconds (30,000 ms), it disconnects that client.
//pingInterval => Every 25 seconds, the server sends a ping to check if the client is still connected.
//allowEIO3:false => Block old socket.io v2 clients
module.exports.io = new Server(server, {
  pingTimeout:30000,
  pingInterval:25000,
  allowEIO3:false,
  cors: corsOptions
});

server.listen(PORT, (err) => {
  if (err) {
    console.error(`Error During Server running at ${HOST_NAME}:${PORT}/`)
  } else {
    console.log(`Server running at ${HOST_NAME}:${PORT}/`);
  }
})

require('./socket');


