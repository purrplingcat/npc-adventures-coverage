const fs = require("fs");
const path = require("path");

function init(app) {
  app.get("/reports", function(req, res) {
    res.json(JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/report.json"))));
  });
}

module.exports = {
  init
}
