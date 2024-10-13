const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const auth = require('./routes/auth');
const errorHandler = require('./middleware/error');
const userRoutes = require('./routes/userRoutes');
const trainingModuleRoutes = require('./routes/trainingModuleRoutes');


const app = express();

// Connect to database
 connectDB();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Mount routers
 app.use('/api/v1/auth', auth);
 app.use('/api/v1/users', userRoutes);
 app.use('/api/v1/training-modules', trainingModuleRoutes);

 // Error handler
 app.use(errorHandler);



const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;