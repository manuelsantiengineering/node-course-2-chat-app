require("./config/config");

const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) =>{
  console.log("New user connected");

  //Event emiters
  socket.emit("newMessage", {
    from: "Tomatito",
    text: "Dimelo Tomatito te lo envio desde el server",
    createdAt: 12345
  });

  //Event listeners
  socket.on("createMessage" ,(newEmail) =>{
    console.log("createMessage", newEmail);
  });

  socket.on("disconnect", () =>{
    console.log("User was disconnected from server");
  });
});




server.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`);
});
