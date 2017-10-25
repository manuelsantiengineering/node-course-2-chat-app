var socket = io();


function scrollToBotton(){
  //Selectors
  var chatBoard = jQuery("#chat-board");
  var panel = jQuery("#panel");
  var newMessage = chatBoard.children("li:last-child");

  //Heights
  var clientHeight = panel.prop('clientHeight');
  var scrollTop = panel.prop('scrollTop');
  var scrollHeight = panel.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if( (clientHeight+scrollTop+newMessageHeight+lastMessageHeight) >= scrollHeight){
    panel.scrollTop(scrollHeight);
  }


}

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
  scrollToBotton();
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
