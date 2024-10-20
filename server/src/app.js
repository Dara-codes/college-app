const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const auth = require('./routes/auth');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const errorHandler = require('./middleware/error');
const userRoutes = require('./routes/userRoutes');
const trainingModuleRoutes = require('./routes/trainingModuleRoutes');
const doctoralStudentRoutes = require('./routes/doctoralStudentRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes')


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
 app.use('/api/v1/doctoral-students', doctoralStudentRoutes);
 app.use('/api/v1/supervisors', supervisorRoutes);
 

 // Error handler
 app.use(errorHandler);

// Admin seeding function
async function seedAdminUser() {
  try {
    // Check if an admin exists within the database
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      // If it doesn't exist, create one
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'adminpassword', salt);

      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user seeded successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    await seedAdminUser(); // Call the seedAdminUser function after the server starts
});

module.exports = app;