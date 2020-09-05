const io = require("socket.io")(8000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => { // i f new user joined
        // console.log('new user', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); // this will notify all other users that new user has joined
    });

    socket.on('send', message =>{ // send, recieve, user-joied.......all are not predefined u can give any name
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]}); // this will send message to everyone with who sent it
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});