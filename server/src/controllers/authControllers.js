const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validationResult, check } = require('express-validator');
const passwordUtils = require('../utils/PasswordUtils');
const { verifyPassword, sendTokenResponse } = require('../utils/authUtils');
const sendEmail = require('../utils/sendEmail');
const Supervisor = require('../models/Supervisor');
const DoctoralStudent = require('../models/DoctoralStudent');

// Define valid roles
const VALID_ROLES = ['admin', 'supervisor', 'doctoral_student'];

// Validation middleware
exports.validateRegister = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Please provide a valid email address'),
  check('password')
    .isLength({ min: 7 })
    .withMessage('Password must be at least 7 characters long'),
  check('role')
    .optional()
    .isIn(VALID_ROLES)
    .withMessage('Role must be either ADMIN, SUPERVISOR or DOCTORAL_STUDENT'),
];




// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, role, ...additionalInfo } = req.body;

  // Hash password
  const hashedPassword = await passwordUtils.hashUserPassword(password);

  // Check if this is the first admin being created
  const adminCount = await User.countDocuments({ role: 'admin' });
  
  if (role === 'admin' && adminCount > 0) {
    return next(new ErrorResponse('Admin already exists', 400));
  }

  // Set role (default to doctoral_student if not specified or if an invalid role is provided)
  const userRole = VALID_ROLES.includes(role) ? role : 'doctoral_student';

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole
  });

  // Create role-specific document
  if (userRole === 'supervisor') {
    await Supervisor.create({
      user: user._id,
      email: user.email,
      department: additionalInfo.department,
      specialization: additionalInfo.specialization,
      yearsOfExperience: additionalInfo.yearsOfExperience
    });
  } else if (userRole === 'doctoral_student') {
    await DoctoralStudent.create({
      user: user._id,
      email: user.email,
      researchTopic: additionalInfo.researchTopic,
      supervisor: additionalInfo.supervisor,
      startDate: additionalInfo.startDate,
      expectedCompletionDate: additionalInfo.expectedCompletionDate
    });
  }

  // Send response without token
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  });
});


// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await verifyPassword(password, user.password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return next(new ErrorResponse('Please provide values for all fields', 400));
  }

  const fieldsToUpdate = {
    firstName,
    lastName,
    email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  const isMatch = await verifyPassword(req.body.currentPassword, user.password);
  if (!isMatch) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  // Hash new password
  user.password = await passwordUtils.hashUserPassword(req.body.newPassword);
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Validation middleware for admin creation
exports.validateAdminCreation = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Please provide a valid email address'),
  check('password')
    .isLength({ min: 7 })
    .withMessage('Password must be at least 7 characters long'),
];

// @desc    Create admin user
// @route   POST /api/v1/auth/create-admin
// @access  Private/Admin
exports.createAdmin = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  // Check if admin already exists
  const adminCount = await User.countDocuments({ role: 'admin' });
  if (adminCount > 0) {
    return next(new ErrorResponse('Admin already exists', 400));
  }

  // Hash password
  const hashedPassword = await passwordUtils.hashUserPassword(password);

  // Create admin user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: 'admin'
  });

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = await passwordUtils.hashUserPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

module.exports = exports;




