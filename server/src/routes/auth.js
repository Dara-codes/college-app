const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  createAdmin,
  validateRegister,
  validateAdminCreation
} = require('../controllers/authControllers');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.post('/register', validateRegister, register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

// Admin-only route for creating new admin users
router.post('/create-admin', protect, authorize('admin'), validateAdminCreation, createAdmin);

module.exports = router;