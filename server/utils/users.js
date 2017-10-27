
class Users {
  constructor(){
    this.users = [];
  }

  addUser(id, username, room){
    var user = {id, username, room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var user = this.getUserById(id);
    if(user){
      this.users = this.users.filter((user)=>{
        return user.id !== id;
      });
    }
    return user;
  }

  getUserById(id){
    var user = this.users.filter((user)=>{
      return user.id === id;
    });
    return this.users.filter( (user) => user.id === id)[0];
  }
  getUserListInRoom(room){
    var users = this.users.filter((user)=>{
      return user.room === room;
    });
    var namesArray = users.map((user)=>{
      return user.username;
    });

    return namesArray;
  }

}


module.exports = {Users};

// class Person {
//
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDescription(){
//     return `${this.name} is ${this.age} years old.`;
//   }
//
// }
