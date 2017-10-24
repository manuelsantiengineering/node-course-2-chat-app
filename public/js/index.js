var socket = io();

socket.on("connect", function(){
  console.log("Connected to server");
});

socket.on("disconnect", function(){
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message){
  console.log("New message", message);

  var date = moment(message.createdAt).format('MMM D YYYY - h:mm a');
  var chatBoard = jQuery("#chat-board");
  var template = jQuery("#message-template").html();

  var list = Mustache.render(template, {
    username: message.from,
    text: message.text,
    createdAt: date
  });

  chatBoard.append(list);

});

// socket.emit("createMessage", {
//   from: "pimiento@tomates.com",
//   to: "tomatito@tomates.com",
//   text: "Hola Tomatito desde index.js"
// }, function(data){
//   // console.log(data);
// });

var messageTextbox = jQuery("[name=message]");

jQuery("#btn-chat").on("submit", function(event){
  event.preventDefault();
  //
  // socket.emit("createMessage", {
  //   from: "User name",
  //   text: messageTextbox.val()
  // }, function(){
  //   messageTextbox.val('');
  // });

});

jQuery("#message-form").on("submit", function(event){
  event.preventDefault();

  socket.emit("createMessage", {
    from: "User name",
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  });
});

// var locationButton = jQuery("#btn-geolocation");
// locationButton.on("click", function(){
//   if(navigator.geolocation){
//     return alert("Geolocation not supported by browser");
//   }
//   navigator.geolocation.getCurrentPosition(function(position){
//     console.log(position);
//   },function(){
//     alert("Unable to fetch location.")
//   });
// });
