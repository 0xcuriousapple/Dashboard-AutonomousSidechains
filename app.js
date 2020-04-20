// static file server for all resources in local directory public and below
// AND handle forms submission to path /forms/...
var express = require("express"); //npm install express
var bodyParser = require("body-parser"); // npm install body-parser
var http = require("http");
var APP_VERSION = "0.8";

var PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);

blockstore = {};
sidechainstore = {};
peerstore = {};
block_count = -1;
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

io.on("connection", (socket) => {
  console.log("a user connected-----------------------");
  tempblockstore = {};
  for (i = 0; i <= block_count && i < 7; i++) {
    tempblockstore[i] = block_count - i;
  }

  tempsidestore = {};
  for (i = 0; i < sidechain_count && i < 8; i++) {
    tempsidestore[i] = sidechainstore[sidechain_count - i - 1];
  }

  temppeerstore = {};
  for (i = 0; i < peer_count && i < 5; i++) {
    temppeerstore[i] = peerstore[peer_count - i - 1];
  }
  obj = {
    block: tempblockstore,
    side: tempsidestore,
    peer: temppeerstore,
  };
  socket.emit("init", obj);
});

app.get("/trie", function (req, res) {
  res.sendFile("./public/triehtml.html", { root: __dirname });
});

app.post("/dashboardblock", function (req, res, next) {
  blockstore[block_count + 1] = req.body.block;
  obj = {
    type: "block",
    id: block_count + 1,
  };
  io.emit("chat message", obj);
  block_count = block_count + 1;
  res.end();
});

app.post("/dashboardsidechain", function (req, res, next) {
  obj = {
    type: "side",
    name: req.body.obj.name,
    address: req.body.obj.address,
    id: req.body.obj.id,
  };
  sidechainstore[sidechain_count] = obj;
  sidechain_count = sidechain_count + 1;
  io.emit("chat message", obj);
  res.end();
});

app.post("/dashboardpeer", function (req, res, next) {
  console.log(req.body.obj);
  obj = {
    type: "peer",
    address: req.body.obj.address,
  };
  peerstore[peer_count] = obj.address;
  peer_count = peer_count + 1;
  io.emit("chat message", obj);
  res.end();
});

app.get("/block", (req, res, next) => {
  const { id } = req.query;

  const block = blockstore[id];

  res.json({ block });
});

app.get("/allsidechains", (req, res, next) => {
  res.json({ sidechainstore });
});

app.get("/allpeers", (req, res, next) => {
  res.json({ peerstore });
});

app.get("/blockchain", (req, res, next) => {
  res.json({ blockstore });
});
