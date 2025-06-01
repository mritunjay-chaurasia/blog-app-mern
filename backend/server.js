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

// corsOptions allows requests only from the domain specified 
const corsOptions = {
  origin: process.env.FRONTEND_URL,
}
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', rotuer);

app.get('/', (req, res) => {
  res.send("Hello from Node.js API")
})

const server = http.createServer(app)

server.listen(PORT, (err) => {
  if (err) {
    console.error(`Error During Server running at ${HOST_NAME}:${PORT}/`)
  } else {
    console.log(`Server running at ${HOST_NAME}:${PORT}/`);
  }
})


