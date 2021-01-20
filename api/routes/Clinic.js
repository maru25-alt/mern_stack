import ClinicModel from "../models/ClinicModel.js";
import express from "express";
import {signup, signin} from  '../middlewares/validate.js';
import jwt from 'jsonwebtoken';
import  bcrypt from 'bcrypt';
import {uploader} from '../middlewares/multer.js'
const route = express.Router();

route.post("/", async (req, res) => {
  const { name, password, email, account } = req.body;
  let clinic = {};
  clinic.name = name;
  clinic.email = email;
  clinic.password = password;
  clinic.account = account;
  let clinicModel = new ClinicModel(clinic);
  await clinicModel.save();
  res.json(clinic);
});

route.get("/", async (req, res) => {
  const clinics = await ClinicModel.find({ account: "clinic" });
  res.json(clinics);
});

route.get("/user/:id", async(req, res) => {
    const user = await ClinicModel.findOne({ _id: req.params.id });
     return res.json(user)
})

route.get("/:id", async (req, res) => {
  if(!req.params.id) {
    return res.status(400).send('Missing URL parameter: username')
  }
  try {
    const clinic = await ClinicModel.findOne({ _id: req.params.id });
    res.status(200).json({success: true, clinic});
  } catch (error) {
    res.status(404).send({ success: false, error:`Clinic not fount`});
  }
});


//update
route.put('/update/:id', (req, res) => {
  if(!req.params.id) {
    return res.status(400).send('Missing URL parameter: username')
  }
  console.log(req.body)
  ClinicModel.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  })
  .then(doc => {
      console.log(doc)
      res.json({success: true, newData: doc});
    })
  .catch(err => {
      res.json({success: false, message:err})
  })

});

route.post('/upload/:id', uploader.single('file') ,(req , res) => {
  try {
   // console.log("logging req.file: ", req.file);
    res.sendFile(`../consumerPhotos/${req.img.filename}`);
  } catch (err) {
    console.log(err)
    res.json({success: false, message:err});
  }
})


route.delete("/:id", async (req, res, d) => {
  const clinic = await ClinicModel.deleteOne({ _id: req.params.id });
  if (d.acknowledged === true && d.deletedCount === 1) {
    res.status(200).send(`deleted ${clinic}`);
  }

  // Use your response code
  res.send("Record doesn't exist or already deleted"); // Use your response code
});


//signup
route.post('/signup', async(req, res) => {
  const { name, password, email, account } = req.body;
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
      account
    }
    const emailExist = await ClinicModel.findOne({
      email
    })
    if(emailExist){
      return res.json({success: false, error: "Email already in use"})
    }
    bcrypt.hash(password, 10, (err, hash) => {
      userData.password = hash
      ClinicModel.create(userData).then(user => {
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




///signin
route.post('/signin', async(req, res) => {
  const {error} = signin.validate(req.body);
  if(error){
   return   res.send({ error: error.details[0].message})
  }
  ClinicModel.findOne({
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



export default route;
