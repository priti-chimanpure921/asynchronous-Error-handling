const express = require("express");
const app = express();
const port = 8080 ;
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./Models/chat.js");
const methodOverride = require('method-override');
const ExpressError = require("./ExpressError.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended : true })); // to parse data of post request
app.use(methodOverride('_method'));

//Error handling middleware
app.use((err,req,res,next)=>{
    let { status = 500 , message = "Some Error..."} = err ;
    res.status(status).send(message);
});

app.get("/",(req,res)=>{
    res.send("I am root");
});

//INDEX Route
app.get("/chat",async (req,res)=>{
    try{
        let chats = await Chat.find();
        console.log(chats);
        res.render("index.ejs",{chats});
    }catch(err){
        next(err);
    }
});

//NEW Route
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
    // throw new ExpressError(404,"Page not found");
});

//POST chat in DB
app.post("/chat",async (req,res)=>{
    try{
    // console.log(req.body);
    let { from , msg , to } = req.body ;
    let newChat = new Chat({
        from : from ,
        msg : msg ,
        to : to ,
        created_at : new Date()
    });
    console.log(newChat);
    await newChat.save().then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    });

    res.redirect("/chat");
}catch(err)
{
    next(err);
}
});

//Edit Route
app.get("/chat/:id/edit",async (req,res)=>{
    try{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    console.log(chat);
    
    res.render("edit.ejs",{chat});
    }catch(err)
    {
        next(err);
    }
});

//SHOW ROUTE
app.get("/chat/:id",async(req,res,next)=>{
    try
    {
        let {id }= req.params ;
        let chat = await Chat.findById(id);
        if(!chat)
        {
            return(next(new ExpressError(404,"chat not found")));
        }
        else
        {
            res.render("edit.ejs",{chat});
        }
    }
    catch(err)
    {
        next(err);
    }
});

//UPDATE Route
app.put("/chat/:id",async (req,res)=>{
    try{
    let {id} = req.params;
    let { msg : newMsg } = req.body ;
    let chat = await Chat.findById(id);
    console.log(chat.created_at);
    let newChat = await Chat.findByIdAndUpdate(id,{ msg:newMsg , created_at : new Date()},{runValidators:true , new:true});
    res.redirect("/chat");
    // res.send("working");
    }catch(err)
    {
        next(err);
    }
});

//Destroy Route
app.delete("/chat/:id",async (req,res)=>{
    try{
    let {id} = req.params;
    console.log(id);
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chat");
    }catch(err)
    {
        next(err);
    }
});

main().then(()=>{
    console.log("Connection to MONGODB successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

app.listen(port,()=>{
    console.log("Listening to port 8080");
});


