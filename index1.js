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

function wrapAsync(fn)
{
    return function(req,res,next){
        fn(req,res,next).catch(err => next(err));
    }
}
//INDEX Route
app.get("/chat",wrapAsync ( async (req,res)=>{
    
        let chats = await Chat.find();
        console.log(chats);
        res.render("index.ejs",{chats});

}));

//NEW Route
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
    // throw new ExpressError(404,"Page not found");
});

//POST chat in DB
app.post("/chat", wrapAsync ( async (req,res)=>{
    
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

}));

//Edit Route
app.get("/chat/:id/edit", wrapAsync ( async (req,res)=>{
    
    let {id} = req.params;
    let chat = await Chat.findById(id);
    console.log(chat);
    
    res.render("edit.ejs",{chat});
    
}));

//SHOW ROUTE
app.get("/chat/:id",wrapAsync ( async(req,res,next)=>{
    
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
    
}));

//UPDATE Route
app.put("/chat/:id", wrapAsync (async (req,res)=>{
    
    let {id} = req.params;
    let { msg : newMsg } = req.body ;
    let chat = await Chat.findById(id);
    console.log(chat.created_at);
    let newChat = await Chat.findByIdAndUpdate(id,{ msg:newMsg , created_at : new Date()},{runValidators:true , new:true});
    res.redirect("/chat");
    // res.send("working");
    
}));

//Destroy Route
app.delete("/chat/:id",wrapAsync ( async (req,res)=>{
    
    let {id} = req.params;
    console.log(id);
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chat");
   
}));

main().then(()=>{
    console.log("Connection to MONGODB successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

app.listen(port,()=>{
    console.log("Listening to port 8080");
});


