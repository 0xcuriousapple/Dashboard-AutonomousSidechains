var request = require("request");
let { obj } = {
    obj: {
        name: "Amazon",
        address: "Amazon",
        id: "Amazon",
    },
};

request.post(
    "http://localhost:1234/dashboardsidechain",
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