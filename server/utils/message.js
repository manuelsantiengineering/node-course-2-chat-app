
// var generateMessage = (from, to, text) =>{
//   return {
//     from,
//     to,
//     text,
//     createdAt: new Date().getTime()
//   };
// };


var generateMessage = (message) =>{
  return {
    from: message.from,
    to: message.to,
    text: message.text,
    createdAt: new Date().getTime()
  };
};

  module.exports = {
    generateMessage
  };
