const DoctoralStudent = require('../models/DoctoralStudent');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validationResult, check } = require('express-validator');

// @desc    Get doctoral student profile
// @route   GET /api/v1/doctoral-students/profile
// @access  Private (Doctoral Students only)
exports.getProfile = asyncHandler(async (req, res, next) => {
  const doctoralStudent = await DoctoralStudent.findOne({ user: req.user.id }).populate('user', 'firstName lastName email');
  
  if (!doctoralStudent) {
    return next(new ErrorResponse('Doctoral student profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: doctoralStudent
  });
});

// @desc    Update doctoral student profile
// @route   PUT /api/v1/doctoral-students/profile
// @access  Private (Doctoral Students only)
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { researchTopic, startDate, expectedCompletionDate } = req.body;

  const doctoralStudent = await DoctoralStudent.findOneAndUpdate(
    { user: req.user.id },
    { researchTopic, startDate, expectedCompletionDate },
    { new: true, runValidators: true }
  ).populate('user', 'firstName lastName email');

  if (!doctoralStudent) {
    return next(new ErrorResponse('Doctoral student profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: doctoralStudent
  });
});

// Validation for update profile
exports.validateUpdateProfile = [
  check('researchTopic').notEmpty().withMessage('Research topic is required'),
  check('startDate').notEmpty().withMessage('Start date is required'),
  check('expectedCompletionDate').notEmpty().withMessage('Expected completion date is required'),
];

module.exports = exports;