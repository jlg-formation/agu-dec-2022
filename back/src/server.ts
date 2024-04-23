import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import serveIndex from "serve-index";
// import cors from "cors";
import { api } from "./api";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (client) => {
  client.on("event", (data) => {
    console.log("data: ", data);
    client.emit("yyy", "this is the content of yyy");
  });

  client.emit("xxx", "this is the content");
  client.on("disconnect", () => {
    console.log("disconnect");
  });
});

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
