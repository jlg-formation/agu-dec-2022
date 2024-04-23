import { createServer } from "http";
import { WebSocketServer } from "ws";

import express from "express";
import serveIndex from "serve-index";
// import cors from "cors";
import { api } from "./api";

const app = express();
const server = createServer(app);

const port = +(process.env.PORT || 3000);
const wwwDir: string = "../front/dist/front";

app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

// app.use(cors());

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: wwwDir });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const wss = new WebSocketServer({ port: 5555 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  setInterval(() => {
    ws.send(JSON.stringify({ toto: 123 }));
  }, 1000);
});
