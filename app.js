// static file server for all resources in local directory public and below
// AND handle forms submission to path /forms/...
var express = require("express"); //npm install express
var bodyParser = require("body-parser"); // npm install body-parser
var http = require("http");
var sseMW = require("./sse");
var APP_VERSION = "0.8";

var PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

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

//configure sseMW.sseMiddleware as function to get a stab at incoming requests, in this case by adding a Connection property to the request
app.use(sseMW.sseMiddleware);



// Realtime updates
var sseClients = new sseMW.Topic();

app.get("/updates", function (req, res) {
  console.log("res (should have sseConnection)= " + res.sseConnection);
  var sseConnection = res.sseConnection;
  console.log("sseConnection= ");
  sseConnection.setup();
  sseClients.add(sseConnection);
});

var m;
updateSseClients = function (message) {
  console.log("update all Sse Client with message " + message);
  this.m = message;
  sseClients.forEach(
    function (sseConnection) {
      console.log("send sse message global m" + this.m);
      sseConnection.send(this.m);
    },
    this // this second argument to forEach is the thisArg (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
  );
};

/*
Long - polling and streaming responses
Heroku supports HTTP 1.1 features such as long - polling and streaming responses.An application has an initial 30 second window to respond with a single byte back to the client.However, each byte transmitted thereafter(either received from the client or sent by your application) resets a rolling 55 second window.If no data is sent during the 55 second window, the connection will be terminated.
If you’re sending a streaming response, such as with server - sent events, you’ll need to detect when the client has hung up, and make sure your app server closes the connection promptly.If the server keeps the connection open for 55 seconds without sending any data, you’ll see a request timeout.
*/
/*to keep client seesion alive*/
updateSseClients('log');
function logEvery50Seconds() {
  setTimeout(() => {
    updateSseClients("log");
    logEvery50econds();
  }, 10000)
}

logEvery50Seconds();

app.get("/trie", function (req, res) {
  res.sendFile("./public/triehtml.html", { root: __dirname });
});

app.post("/dashboardblock", function (req, res, next) {
  blockstore[block_count] = req.body.block;
  obj = {
    type: "block",
    id: block_count + 1
  }
  updateSseClients(obj);
  block_count = block_count + 1;
});

app.post("/dashboardsidechain", function (req, res, next) {
  obj = {
    type: "side",
    name: req.body.obj.name,
    address: req.body.obj.address,
    id: req.body.obj.id,
  }
  updateSseClients(obj);
});

app.post("/dashboardpeer", function (req, res, next) {
  obj = {
    type: "peer",
    address: req.body.obj.address,
  }
  updateSseClients(obj);
});
app.get("/block", (req, res, next) => {
  const { id } = req.query;

  const block = blockstore[id];

  res.json({ block });
});
// GetDataFromOtherServer();

// function GetDataFromOtherServer() {
//   updateSseClients("{SD}");
// }

// function wrapItUp() {
//   console.log("It was nice talking to you. Goodbye!");
//   // final recap of the dialog:
//   console.log("All your input:\n " + JSON.stringify(allInput));
// }

// promptForInput();
// var timeToExit = false;

// var allInput = [];

// function promptForInput() {
//   prompt.get(["yourInput"], function (err, result) {
//     //
//     // Log the results.
//     //
//     console.log("Your Input:" + result.yourInput);
//     // send input to function that forwards it to all SSE clients
//     console.log(result.yourInput);
//     updateSseClients(result.yourInput);
//     timeToExit = "exit" == result.yourInput;
//     if (timeToExit) {
//       wrapItUp();
//     } else {
//       allInput.push(result.yourInput);
//       promptForInput();
//     }
//   });
// }

// function wrapItUp() {
//   console.log("It was nice talking to you. Goodbye!");
//   // final recap of the dialog:
//   console.log("All your input:\n " + JSON.stringify(allInput));
// }
