var request = require("request");
// let { block } = {
//   block: {
//     blockHeaders: {
//       parentHash:
//         "ff92ba05b4db3352f3266eae0d5fc3ab2b008901b4a3ff5c610615ecb903ca70",
//       beneficiary:
//         "047c4bf420e07f1f96d0c1a75253b2fb11af04d3461be1d72bf9406da47a3a9337a7117e504792161fcba4248a5be5bde17f543f1a3a8390f67fd09cacb198c058",
//       difficulty: 2,
//       number: 1,
//       timestamp: 1587276133014,
//       transactionsRoot:
//         "27c3e1d20394151648fbc782954bbeac2e2c99589be7e81c47a5b2af1fc7cb61",
//       stateRoot:
//         "310ac9ea8db1331d088b666b50830fb05b72b1a8994c9bc58e0beb3af3c453bb",
//       nonce: 627580161943523300,
//     },
//     transactionSeries: [[Object], [Object]],
//   },
// };
// request.post(
//   "http://localhost:1234/dashboardblock",
//   {
//     json: {
//       block,
//     },
//   },
//   (error, res, body) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     console.log(`statusCode: ${res.statusCode}`);
//     console.log(body);
//   }
// );


let { obj } = {
  obj: {
    name: "Amazon",
    address: "Amazon",
    id: "Amazon",
  },
};

request.post(
  "http://localhost:3000/dashboardsidechain",
  {
    json: {
      obj,
    },
  },
  (error, res, body) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`statusCode: ${res.statusCode}`);
    console.log(body);
  }
);

// let { obj } = {
//   obj: {
//     address: "0x945f1679564C2f1d499e7796264bA3E4a8ce9109",
//   },
// };


// request.post(
//   "http://localhost:3000/dashboardpeer",
//   {
//     json: {
//       obj,
//     },
//   },
//   (error, res, body) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     console.log(`statusCode: ${res.statusCode}`);
//     console.log(body);
//     res.end();
//   }

// );
