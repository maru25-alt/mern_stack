const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()
const connection_url = process.env.DB_CONNECT;

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.once('open', ()=> {
    console.log("db connnected")
})


module.exports = mongoose;
