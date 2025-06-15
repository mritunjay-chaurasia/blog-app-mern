
const { io } = require('./server');

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('joinMyRoom', (id) => {
        socket.join(id);
    })

    socket.on('dashboard', (data) => {
        console.log("data:::::::::::::::::", data)
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });


})