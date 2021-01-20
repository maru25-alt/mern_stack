import UsersModel from "../models/UsersModel.js";
import express from "express";
import {signup, signin} from  '../middlewares/validate.js';
import jwt from 'jsonwebtoken';
import  bcrypt from 'bcrypt';
import {uploader} from '../middlewares/multer.js'
import path from 'path';
const __dirname = path.resolve();
const route = express.Router();


route.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  let user = {};

  user.name = name;
  user.email = email;
  user.password = password;
  user.account = "user";

  let userModel = new UsersModel(user);
  await userModel.save();
  res.json(userModel);
});

//signup
route.post('/signup', async(req, res) => {
  const { name, password, email } = req.body;
  const {error} = signup.validate(req.body);

  if(error){
   return  res.json({success: false, error : error.details[0].message})
  }
  else{
    const userData = {
      name,
      password,
      email,
      photoUrl: "",
      account: "user"
    }
    const emailExist = await UsersModel.findOne({
      email
    })
    if(emailExist){
      return res.json({success: false, error: "Email already in use"})
    }
    bcrypt.hash(password, 10, (err, hash) => {
      userData.password = hash
      UsersModel.create(userData).then(user => {
           let token = jwt.sign(userData, process.env.SECRET_TOKEN, {
             expiresIn: 1440
         })
        return  res.header("auth_token",token).json({success: true,token,user})
       }).catch(e => {
         return   res.json({success: false, error: e})
       })
   })
  } 
});



//signin
route.post('/signin', async(req, res) => {
  const {error} = signin.validate(req.body);
  if(error){
   return   res.send({ error: error.details[0].message})
  }
  UsersModel.findOne({
    email: req.body.email,
    account: req.body.account
    }).then((user) => {
     if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.SECRET_TOKEN, {
                expiresIn: 1440
            })
           return  res.header("auth_token",token).json({success: true, token, user})
        } 
        else {
           
           return res.json({ error: 'Wrong Password or Email' })
        }
    } 
    else {
       return res.json({ error: 'Wrong Password or Email' })
    }
  }).catch(err => {
    console.log(err)
  })

})



//get all users
route.get("/", async (req, res) => {
  const users = await UsersModel.find({ account: "user" });
  res.json(users);
});


//get user by id
route.get("/:id", async (req, res) => {
  //validate
  if(!req.params.id) {
    return res.status(400).send('Missing URL parameter: username')
  }
  await UsersModel.findOne({ _id: req.params.id })
  .then(user => {
    if(user){
      return  res.json({success: true,user})
    }
    else{
      return  res.json({success: false, message: 'user does not exists'})
     }
  })
  .catch(err => {
    return res.json({success: false, message: "Server error"})
  });
  
});

route.put('/update/:id', (req, res) => {
  if(!req.params.id) {
    return res.status(400).send('Missing URL parameter: username')
  }
  UsersModel.findOneAndUpdate({
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


//upload image

route.post('/upload/post', uploader.single('photo') ,(req , res) => {
  try {
    //console.log("logging req.file: ", req.file);
    console.log(req.body.caption)
    res.send({path: `${req.file.filename}`});
  } catch (err) {
    console.log(err)
    res.json({success: false, message:err});
  }
})


export default route;
