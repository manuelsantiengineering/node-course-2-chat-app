var expect = require("expect");

var {generateMessage} = require("./message");

describe("generateMessage", () =>{

  it("Should generate correct message object", () =>{
    var testMessage = {
      from: "tomatito@tomates.com",
      to: "cebollita@tomates.com",
      text: "Como te va cebollita"
    }

    var message = generateMessage(testMessage);
    expect(message).toHaveProperty("from", testMessage.from);
    expect(message).toMatchObject(testMessage);
  });

});
