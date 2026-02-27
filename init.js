const mongoose = require('mongoose');

main().then(()=>{
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

const Chat = require("./Models/chat.js");

let allChats = [
    {
    from : "Neha",
    to : "Priti",
    msg : "Let's do this reel",
    created_at : new Date()
},
{
    from : "Vrushali",
    to : "Priti",
    msg : "Konte dress ghetes?",
    created_at : new Date()
},
{
    from : "Mahesh",
    to : "Rakesh",
    msg : "Keva Nightos?",
    created_at : new Date()
}
];

Chat.insertMany(allChats);