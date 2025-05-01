import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import db from './config/db.js';
import path from 'path';

const app = express();

import testRouter from './routes/testRoute.js';
import userRouter from './routes/userRoute.js';
import foodRouter from './routes/foodRoute.js';
import cartRouter from './routes/cartRoute.js';
import adminRouter from './routes/adminRoutes.js';
import orderRouter from './routes/orderRoute.js';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Correctly resolve the path to the uploads directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/test', testRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/food', foodRouter);
app.use('/api/admin', adminRouter);
app.use('/api/order', orderRouter);

const PORT = process.env.PORT || 4000;

db();

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Trying a different port...`);
        const fallbackPort = parseInt(PORT) + 1;
        app.listen(fallbackPort, () => {
            console.log(`Server is now running on port ${fallbackPort}`);
        });
    } else {
        console.error('Server error:', error);
    }
});
