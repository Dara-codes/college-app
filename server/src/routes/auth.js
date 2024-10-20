const express = require('express');
const {
  login,
  logout,
  getMe,
  updatePassword,
  forgotPassword,
  resetPassword,
  registerStudent,
  registerSupervisor,
  validateStudentRegister,
  validateSupervisorRegister
} = require('../controllers/authControllers');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register/student', validateStudentRegister, registerStudent);
router.post('/register/supervisor', validateSupervisorRegister, registerSupervisor);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;