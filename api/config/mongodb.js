import mongoose  from'mongoose';
import  dotenv from 'dotenv';

dotenv.config()
const connection_url = process.env.LOCAL_DB_CONNECT;

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.once('open', ()=> {
    console.log("db connnected localhost db")
})


export default mongoose;
