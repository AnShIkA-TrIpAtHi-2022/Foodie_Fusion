# Foodie Fusion

A full-stack food delivery application with customer and admin interfaces.

## Project Structure

The project consists of three main components:

- `frontend/` - Customer-facing React application
- `admin/` - Admin dashboard React application  
- `backend/` - Express.js API server

## Features

### Customer Frontend
- Browse food menu with categories
- Add/remove items to cart
- User authentication (login/signup)
- Place orders with delivery details
- Multiple payment options (COD/Stripe)
- Track order status
- View order history

### Admin Dashboard
- Add/remove food items
- Manage food categories
- View all orders
- Update order status
- Order tracking

### Backend
- RESTful API endpoints
- MongoDB database integration
- JWT authentication
- Image upload handling
- Stripe payment integration

## Tech Stack

- **Frontend & Admin**: React, React Router, Axios, React Toastify
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, Bcrypt
- **Payment**: Stripe
- **Other**: Multer (file upload), Validator

## Getting Started

1. Clone the repository:

git clone https://github.com/dheeraj0342/Foodie-Fusion.git

2. Install dependencies for all components:
# Install frontend dependencies
cd frontend
npm install

# Install admin dashboard dependencies
cd ../admin
npm install

# Install backend dependencies
cd ../backend
npm install

3. Set up environment variables: Create a .env file in the backend directory with:


PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_KEY=your_stripe_secret_key

4. Start the development servers:

# Start backend server
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev

# Start admin dashboard
cd admin
npm run dev


## API Endpoints

# User Routes
POST /api/user/register - Register new user
POST /api/user/login - User login

# Food Routes
GET /api/food/list - Get all food items
POST /api/food/add - Add new food item
POST /api/food/remove - Remove food item

# Cart Routes
POST /api/cart/get - Get user cart
POST /api/cart/add - Add to cart
POST /api/cart/remove - Remove from cart

# Order Routes
POST /api/order/place - Place order
GET /api/order/list - Get all orders
POST /api/order/status - Update order status
