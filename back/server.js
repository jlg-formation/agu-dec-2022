const express = require("express");
const serveIndex = require("serve-index");
const { api } = require("./api");
const app = express();
const port = 3000;
const wwwDir = ".";

app.use((req, res, next) => {
  console.log("req: ", req.ur1);
  next();
});

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
