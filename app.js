// static file server for all resources in local directory public and below
// AND handle forms submission to path /forms/...
var express = require("express"); //npm install express
var bodyParser = require("body-parser"); // npm install body-parser
var http = require("http");
var APP_VERSION = "0.8";

var PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

blockstore = {};
sidechainstore = {};
peerstore = {};
block_count = 0;
sidechain_count = 0;
peer_count = 0;

server.listen(PORT, function () {
  console.log(
    "Server running, version " +
    APP_VERSION +
    ", Express is listening... at " +
    PORT +
    " for requests"
  );
});

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(__dirname + "/public"));

io.on('connection', (socket) => {
  console.log('a user connected-----------------------');
});

app.get("/trie", function (req, res) {
  res.sendFile("./public/triehtml.html", { root: __dirname });
});

app.post("/dashboardblock", function (req, res, next) {
  blockstore[block_count] = req.body.block;
  obj = {
    type: "block",
    id: block_count + 1
  }
  io.emit('chat message', obj);
  block_count = block_count + 1;
  res.end();
});

app.post("/dashboardsidechain", function (req, res, next) {
  obj = {
    type: "side",
    name: req.body.obj.name,
    address: req.body.obj.address,
    id: req.body.obj.id,
  }
  io.emit('chat message', obj);
  res.end();
});

app.post("/dashboardpeer", function (req, res, next) {
  console.log(req.body.obj);
  obj = {

    type: "peer",
    address: req.body.obj.address,
  }

  io.emit('chat message', obj);
  res.end();
});
app.get("/block", (req, res, next) => {
  const { id } = req.query;

  const block = blockstore[id];

  res.json({ block });
});


/*
Long - polling and streaming responses
Heroku supports HTTP 1.1 features such as long - polling and streaming responses.An application has an initial 30 second window to respond with a single byte back to the client.However, each byte transmitted thereafter(either received from the client or sent by your application) resets a rolling 55 second window.If no data is sent during the 55 second window, the connection will be terminated.
If you’re sending a streaming response, such as with server - sent events, you’ll need to detect when the client has hung up, and make sure your app server closes the connection promptly.If the server keeps the connection open for 55 seconds without sending any data, you’ll see a request timeout.
*/
/*to keep client seesion alive*/
// updateSseClients('log');
// setInterval(() => {
//   updateSseClients('log');
// }, 10000)

//logEvery50Seconds();