const Supervisor = require('../models/Supervisor');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validationResult, check } = require('express-validator');

// @desc    Get supervisor profile
// @route   GET /api/v1/supervisors/profile
// @access  Private (Supervisors only)
exports.getProfile = asyncHandler(async (req, res, next) => {
  const supervisor = await Supervisor.findOne({ user: req.user.id }).populate('user', 'firstName lastName email');
  
  if (!supervisor) {
    return next(new ErrorResponse('Supervisor profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: supervisor
  });
});

// @desc    Update supervisor profile
// @route   PUT /api/v1/supervisors/profile
// @access  Private (Supervisors only)
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { department, specialization, yearsOfExperience } = req.body;

  const supervisor = await Supervisor.findOneAndUpdate(
    { user: req.user.id },
    { department, specialization, yearsOfExperience },
    { new: true, runValidators: true }
  ).populate('user', 'firstName lastName email');

  if (!supervisor) {
    return next(new ErrorResponse('Supervisor profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: supervisor
  });
});

// Validation for update profile
exports.validateUpdateProfile = [
  check('department').notEmpty().withMessage('Department is required'),
  check('specialization').notEmpty().withMessage('Specialization is required'),
  check('yearsOfExperience').isNumeric().withMessage('Years of experience must be a number'),
];

module.exports = exports;