import mongoose from 'mongoose';

const db = async () => {
    try {
        const success = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection failed');
    }
}

export default db;