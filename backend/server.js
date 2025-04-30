const dotenv = require('dotenv');
const {app} = require('./app.js');
const connectDB = require('./db/config.js');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');

dotenv.config({ path: './env' });

const PORT = process.env.PORT || 4005;


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',authRoutes);
app.use('/food', require('./routes/menuItemRoutes.js'));
app.use('/cart', require('./routes/cartRoutes.js'));
app.use('/cart-item', require('./routes/cartItemRoutes.js'));

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed!', err);
  });
  