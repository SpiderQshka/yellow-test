const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;

const app = express();
app.use("favicon.ico", express.static(__dirname + "/build/favicon.ico"));

app.use(express.static(path.resolve(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
