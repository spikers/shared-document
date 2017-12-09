window.addEventListener('load', initiate);

function initiate () {
  var socket = io.connect('http://localhost:3000');
  socket.emit('open', { document: 'document1.txt' });

  var doc = document.getElementById('document');

  doc.addEventListener('keypress', (key) => {
    socket.emit('keystroke', { type: 'keystroke', data: key.key });
  });

  socket.on('open', openDocument.bind(null, doc));
}

function openDocument(domElement, contentObject) {
  console.log('arguments', arguments);
  console.log('contentObject', contentObject);
  var content = contentObject.content;
  var tn = document.createTextNode(content);
  domElement.appendChild(tn);
}