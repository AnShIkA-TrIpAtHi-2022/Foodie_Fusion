const dotenv = require('dotenv');
const app = require('./app.js');
const connectDB = require('./db/config.js');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');

dotenv.config({ path: './env' });

const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',authRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed!', err);
  });
