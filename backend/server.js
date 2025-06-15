import express from 'express' ;
import colors from 'colors' ;
import dotenv from 'dotenv' ;
import morgan from 'morgan' ;
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js' ;
import categoryRoutes from './routes/categoryRoutes.js' ;
import serviceRoutes from './routes/serviceRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors'

// configure dotenv
dotenv.config();
// console.log("Loaded SSLCOMMERZ_STORE_ID:", process.env.SSLCOMMERZ_STORE_ID);
// database config
connectDB();

// REST object
const app = express();

app.use("/uploads/profile", express.static("uploads/profile"));
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- Add this line
app.use(morgan('dev'));


// routes

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/service', serviceRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/order', orderRoutes);
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

