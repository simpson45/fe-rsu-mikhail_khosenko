var http = require('http');
var express = require('express');
var multer = require('multer');
var books = require('./books');
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = 8080;

app.set('port', (process.env.PORT || port));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './img');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

app.post('/upload', multer({ storage: storage }).single('bookCover'), function(req,res){
	console.log(req.body);
	console.log(req.file);
	res.status(200).end();
});

app.get('/getBooks', (req, res) => {
  let allBooks = books.getBooks();
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(allBooks);
});

app.post('/addNewBook', (req, res) => {
  console.log(req.body);
  let newBook = books.addNewBook(req.body.bookTitle, req.body.bookAuthor, req.body.bookCover);
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  console.log("New book " + newBook);
  res.send(newBook);
  res.end(newBook);
});

app.post('/setRating', (req, res) => {
  console.log(req.body);  
  var data = req.body;  
  let allBooks;
  books.setRating(data.bookId, data.rating);
  allBooks = books.getBooks();
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(allBooks);
});

app.use(express.static(__dirname));

server.listen(app.get('port'), () => {
  console.log("Starting web server at localhost:", app.get('port'));
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('hideNotificationRequest', notificationId => {
    console.log(notificationId);
    setTimeout(() => io.emit('allowHideNotification', notificationId), 3000);
  });  
  socket.on('disconnect', () => console.log('Client disconnected'));
});