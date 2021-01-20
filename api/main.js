import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {uploader} from './middlewares/multer.js'
//import routes
import user from "../api/routes/User.js";
import message from "../api/routes/Message.js";
import clinic from "../api/routes/Clinic.js";
import ads from "../api/routes/Ads.js";
import path from 'path';
const __dirname = path.resolve();
//create app
const app = express();
const PORT = process.env.Port || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static("./public"));

//routes
app.use("/api/messages", message);
app.use("/api/accounts/clinics", clinic);
app.use("/api/users", user);
app.use("/api/ads", ads);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});


app.post("/api/upload", uploader.single("photo"), (req, res, next) => {
  try {
    console.log("logging req.file: ", req.file);
    res.send({path: `${req.file.filename}`});
   // res.status(200).sendFile(`${__dirname}/public/consumerPhotos/${req.file.filename}`);
  } 
  catch (err) {
    res.status(418).send(err);
  }
});


app.get('/', (req,res) => {
  res.send('welcome to kapstone app')
})



app.listen(PORT, () => {
  return console.log(`listening on port ${PORT}`)
})