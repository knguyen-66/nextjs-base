/* eslint-disable @typescript-eslint/no-require-imports */
// Source: https://provinces.open-api.vn/redoc

var fs = require("fs");

function setupProvinceData() {
    fetch("https://provinces.open-api.vn/api/?depth=3").then(async function (response) {
        console.log(response.status);
        fs.writeFileSync("src/db/provinces.json", JSON.stringify(await response.json()));
    });
};

setupProvinceData();
