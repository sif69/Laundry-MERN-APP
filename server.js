import express from 'express' ;
import colors from 'colors' ;
import dotenv from 'dotenv' ;
import morgan from 'morgan' ;
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js' ;
import cors from 'cors'

// configure dotenv
dotenv.config();

// database config
connectDB();

// REST object
const app = express();


// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes

app.use('/api/v1/auth', authRoutes);

// REST API

app.get('/', (req, res) => {
    res.send(
        '<h1/>Welcome to the Laundry WEB Site</h1>'
    )
});

// Port
const PORT = process.env.PORT  || 8080 ;


// lister or start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgYellow.black) 
        
    
});
