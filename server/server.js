import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';



const app = express();

const PORT = 4000;


connectDB()

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5177','https://feedback-analyzer-client.onrender.com', 'https://feedback-analyzer-admin.onrender.com']

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));


app.get('/', (req, res) => {
    return res.send('Api Working')
})


app.use('/api/admin', authRouter);
app.use('/api/feedback', feedbackRoutes);


app.listen(PORT, () => console.log(`server start on PORT:${PORT}`))
