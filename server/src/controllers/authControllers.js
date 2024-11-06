const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validationResult, check } = require('express-validator');
const passwordUtils = require('../utils/PasswordUtils');
const { verifyPassword, sendTokenResponse, VALID_ROLES } = require('../utils/authUtils');
const sendEmail = require('../utils/sendEmail');
const Supervisor = require('../models/Supervisor');
const DoctoralStudent = require('../models/DoctoralStudent');
const Milestone = require('../models/Milestone');
const ResearchInterest = require('../models/ResearchInterest');
const { existsByEmail } = require('../services/UserService')


// Validation middleware for doctoral student registration
exports.validateStudentRegister = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Please provide a valid email address'),
  check('password')
    .isLength({ min: 7 })
    .withMessage('Password must be at least 7 characters long'),
  check('thesisTitle').notEmpty().withMessage('Thesis title is required')
];

// Validation middleware for supervisor registration
exports.validateSupervisorRegister = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Please provide a valid email address'),
  check('password')
    .isLength({ min: 7 })
    .withMessage('Password must be at least 7 characters long'),
  check('department').notEmpty().withMessage('Department is required'),
  check('specialization').notEmpty().withMessage('Specialization is required'),
  check('yearsOfExperience').isNumeric().withMessage('Years of experience must be a number'),
];

// @desc    Register doctoral student
// @route   POST /api/v1/auth/register/student
// @access  Public
exports.registerStudent = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, thesisTitle, startDate, expectedCompletionDate, thesisDescription, milestones, researchInterest } = req.body;

  if (await existsByEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'This email address is already registered. Please use a different email.'
    });
  }
  // Hash password
  const hashedPassword = await passwordUtils.hashUserPassword(password);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: VALID_ROLES.DOCTORAL_STUDENT
  });


  const milestoneIds = await Promise.all(
    milestones.map(async (milestone) => {
      const createdMilestone = await Milestone.create({
        title: milestone.title,
        startDate: milestone.startDate,
        deadlineDate: milestone.deadlineDate,
        createdBy: user._id 
      });
      return createdMilestone._id;
    })
  );

  
  const userResearchInterest = await ResearchInterest.create({
    researchMethod: researchInterest.researchMethod,
    interests: researchInterest.interests,
    researchGoals: researchInterest.researchGoals,
    createdBy: user._id 
  })

  // Create doctoral student document
  await DoctoralStudent.create({
    user: user._id,
    email: user.email,
    thesisTitle,
    thesisDescription,
    startDate,
    expectedCompletionDate,
    milestones: milestoneIds,
    researchInterest: userResearchInterest._id
  });

  // Send response without token
  res.status(201).json({
    success: true,
    message: 'Doctoral student registered successfully',
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Register supervisor
// @route   POST /api/v1/auth/register/supervisor
// @access  Public
exports.registerSupervisor = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, department, specialization, yearsOfExperience } = req.body;

  // Hash password
  const hashedPassword = await passwordUtils.hashUserPassword(password);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: VALID_ROLES.SUPERVISOR
  });

  // Create supervisor document
  await Supervisor.create({
    user: user._id,
    email: user.email,
    department,
    specialization,
    yearsOfExperience
  });

  // Send response without token
  res.status(201).json({
    success: true,
    message: 'Supervisor registered successfully',
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

  console.log('email ', email, 'password', password)
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




