var socket = io();

socket.on("connect", function(){
  console.log("Connected to server");
});

socket.on("disconnect", function(){
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message){
  console.log("New message", message);

  var li = jQuery("<li></li>");
  li.attr("class","left clearfix")
  var div0 = jQuery("<div></div>");
  div0.attr("class","chat-body clearfix");

  var divUsername = jQuery("<div></div>");
  divUsername.attr("class","header");
  div0.append(divUsername);

  var strongUsername = jQuery("<strong></strong>");
  strongUsername.attr("class","primary-font");
  strongUsername.attr("id","username");
  strongUsername.text(`${message.from}`);

  var smallTime = jQuery("<small></small>");
  smallTime.attr("class","pull-right text-muted");

  var date = moment(message.createdAt).format('MMM D YYYY - h:mm a');
  // var date = new Date(message.createdAt);

  var spanTime = jQuery("<span></span>");
  spanTime.attr("class","glyphicon glyphicon-time");
  spanTime.text(` ${date}`);

  smallTime.append(spanTime);
  divUsername.append(strongUsername);
  divUsername.append(smallTime);

  var chatText = jQuery("<p></p>");
  chatText.text(`${message.text}`);
  div0.append(divUsername);
  div0.append(chatText);

  li.append(div0);

  var chatBoard = jQuery("#chat-board");
  chatBoard.append(li);
  $("#chat-board").animate({scrollTop: 3000});
  // chatBoard.animate({ scrollTop: chatBoard.prop('scrollHeight')}, 1000);

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
