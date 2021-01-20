import MessageModel from "../models/MessageModel.js";
import UserModel from "../models/UsersModel.js";
import express from "express";

const route = express.Router();

route.post("/", async (req, res) => {
  const { sender, body } = req.body;
  let message = {};

  let timestamp = Date.now();

  message.sender = sender;
  message.body = body;
  message.timestamp = timestamp;

  let messageModel = new MessageModel(message);
  await messageModel.save();
  res.json(message);
});

route.get("/", async (req, res) => {
  const messages = await MessageModel.find();
  res.json(messages);
});

//send message 
route.post('/addmessage/:id', (req, res) => {
      MessageModel.findOneAndUpdate({
        _id: req.params.id
      }, req.body, {
        new: true
      })
      .then(doc => {
          res.json({success: true, newData: doc})
        })
      .catch(err => {
          res.json({success: true, message:err})
      })
})


//get userChats 
route.get("/chats/:id", async (req, res) => {
  const messageChats = await MessageModel.find({$or: [ {user1: req.params.id} ,{ user2: req.params.id }]});
  res.json(messageChats);
});

//get chatMessage
route.get('/chat/:id', async (req, res) => {
   if(!req.params.id){
     return res.json({success: false, message:" id is required"})
   }
  console.log(req.params.id)
   MessageModel.findOne({_id: req.params.id})
   .then(doc => {
     console.log(doc, "doc")
      return res.json(doc)
   })
   .catch(err => {
    console.log(err, "err")
     return res.json({success: false, message: "something when wrong"})
   })
})

//add connect
route.post('/connect' , async (req, res) => {
  const  user1 = req.body.user1;
  const   user2 = req.body.user2;

  //validate
  if( !user1 || !user2){
    return res.json({success: false, message: "User is required"})
  }

  await UserModel.findOne({_id: user1}).then(doc => {
    if(!doc){
      return res.json({success: false, message: "User does not exists"})
    }
  }).catch(err => {
    console.log(err)
    return res.json({success: false, message: "User does not exists"})
  });
  await UserModel.findOne({_id: user2}).then(doc => {
    if(!doc){
      return res.json({success: false, message: "User does not exists"})
    }
  }).catch(err => {
    console.log(err)
    return res.json({success: false, message: "User does not exists"})
  });

  await MessageModel.findOne({ $or: [{user1, user2}, {user1: user2,  user2: user1}]})
  .then( async(docExist) => {
     if(docExist){
          console.log(docExist)
          return res.json({success: true, doc: docExist._id});
     }
     else{
      MessageModel.create({user1, user2}).then(doc => {
        return res.json({success: true, doc: doc._id});
      })
     }
  })
  .catch(err => {
    console.log("err", err)
     return  res.json({success: false, error: "something went wrong"});
 })

})

export default route;
