require("./config/config");

const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) =>{
  console.log("New user connected");

  var newUserMessage = {
    from: "Admin",
    to: "New User",
    text: "Welcome to the chat app"
  };
  var newUserJoins = {
    from: "Admin",
    to: "Broadcast",
    text: "New user joined"
  };

  var sayHello = () =>{
    return("Just saying hello");
  };
  socket.emit("newMessage", generateMessage(newUserMessage));

  socket.broadcast.emit("newMessage", generateMessage(newUserJoins));

  //Event listeners
  socket.on("createMessage" ,(message, callback) =>{
    // console.log("createMessage", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    callback();

    // socket.broadcast.emit("newMessage",{
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on("disconnect", () =>{
    console.log("User was disconnected from server");
  });
});




server.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`);
});
