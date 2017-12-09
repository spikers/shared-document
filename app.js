import express from 'express';
import { resolve } from 'path';
import socket from 'socket.io';
import http from 'http';
import { readFile } from 'fs';

const PORT = 3000;
const app = express();
const server = app.listen(PORT);
const io = socket.listen(server);

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(resolve(__dirname, 'public', 'html', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Connected to Socket.io');
  socket.on('open', function (data) {
    console.log('data', data);
    if (!data.document) {
      console.log('Document Not Found');
      process.exit(1);
    }
    console.log('this is the path', resolve(__dirname, 'documents', data.document));
    readFile(resolve(__dirname, 'documents', data.document), 'utf-8', (err, data) => {
      socket.emit('open', { content: data });
    });
  });
  socket.on('keystroke', function (data) {
    console.log(data);
  });
});

server.listen(PORT, () => {
  console.log('Server Started on Port %s', PORT);
});
