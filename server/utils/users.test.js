const expect = require("expect");

const {Users} = require("./users");

describe("Users", () =>{

  var users;

  beforeEach( ()=>{
    users = new Users();
    users.users = [
      {
      id: "001",
      username: "Tomatito01",
      room: "Room01"
    },
    {
      id: "002",
      username: "Tomatito02",
      room: "Room02"
    },
    {
      id: "003",
      username: "Tomatito03",
      room: "Room01"
    }
  ];
  });
  it("Should add new user", () =>{
    var users = new Users();
    var user = {
      id: "007",
      username: "Tomatito01",
      room: "Office"
    };

    var resUser = users.addUser(user.id, user.username, user.room);

    expect(users.users).toEqual([user]);


  });

  it("Should return names for Room01", () =>{
    var userslist = users.getUserListInRoom("Room01");
    expect(userslist).toEqual(["Tomatito01","Tomatito03"]);
  });

  it("Should return names for Room02", () =>{
    var userslist = users.getUserListInRoom("Room02");
    expect(userslist).toEqual(["Tomatito02"]);
  });

  it("Should remove user", () =>{
    users.removeUser("001");
    expect(users.users[0].username).toEqual("Tomatito02");
    expect(users.users[1].username).toEqual("Tomatito03");
    expect(users.users[2]).toBeUndefined();
  });

  it("Should NOT remove user", () =>{
    users.removeUser("00");
    expect(users.users[0].username).toEqual("Tomatito01");
    expect(users.users[1].username).toEqual("Tomatito02");
    expect(users.users[2].username).toEqual("Tomatito03");
  });

  it("Should get user by id", () =>{
    var user = users.getUserById("001");
    expect(user).toBe(users.users[0]);
  });

  it("Should NOT get user by id", () =>{
    var user = users.getUserById("006");
    expect(user).toBeUndefined();
  });

});
