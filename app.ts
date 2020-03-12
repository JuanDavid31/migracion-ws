const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
