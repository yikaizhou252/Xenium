const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  console.log("req", req.query.data);
  res.send(req.query.data + " Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
