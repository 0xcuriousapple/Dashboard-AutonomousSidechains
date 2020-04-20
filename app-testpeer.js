var request = require("request");
let { obj } = {
    obj: {
        address: "0x945f1679564C2f1d499e7796264bA3E4a8ce9109",
    },
};


request.post(
    "http://localhost:1234/dashboardpeer",
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