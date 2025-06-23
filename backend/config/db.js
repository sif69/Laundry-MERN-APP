import mongoose from 'mongoose';
import colors from 'colors' ;


// Database connection

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL) 
        console.log(
            `Connected to Mongodb Database : ${conn.connection.host}`.bgMagenta.black
        )

    }
    catch (error) {
        console.log(`Error in Mongodb : ${error.message}`.bgRed.black)
       
    }

};

export default connectDB;