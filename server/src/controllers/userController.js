const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { VALID_ROLES } = require("../utils/authUtils");
const { validationResult, check } = require("express-validator");

// @desc    Get logged in user's profile
// @route   GET /api/v1/users/profile
// @access  Private (All authenticated users)
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

// @desc    Get all users
// @route   GET /api/v1/users/admin/users
// @access  Private (Admin only)
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const includeInactive = req.query.includeInactive === "true";
  let query = includeInactive ? {} : { isActive: true };

  const users = await User.find(query);
  res.status(200).json({ success: true, data: users });
});

// @desc    Get user by ID
// @route   GET /api/v1/users/admin/users/:id
// @access  Private (Admin only)
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id, isActive: true });
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

// @desc    Create user
// @route   POST /api/v1/users/admin/users
// @access  Public (for first admin) / Private (Admin only for subsequent creations)
exports.createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Ensure only non-admin roles can be created through this route
  if (role === VALID_ROLES.ADMIN) {
    return next(
      new ErrorResponse("Admin users cannot be created through this route", 403)
    );
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: role || VALID_ROLES.DOCTORAL_STUDENT, // Default to doctoral_student if no role provided
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/v1/users/admin/users/:id
// @access  Private (Admin only)
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

// @desc    Disable user (soft delete)
// @route   PUT /api/v1/users/admin/users/:id/disable
// @access  Private (Admin only)
exports.disableUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  if (!user.isActive) {
    return next(new ErrorResponse(`User is already disabled`, 400));
  }

  user.isActive = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User has been disabled",
    data: { id: user._id, isActive: user.isActive },
  });
});

// @desc    Enable user
// @route   PUT /api/v1/users/admin/users/:id/enable
// @access  Private (Admin only)
exports.enableUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  if (user.isActive) {
    return next(new ErrorResponse(`User is already active`, 400));
  }

  user.isActive = true;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User has been enabled",
    data: { id: user._id, isActive: user.isActive },
  });
});

// @desc    Get all students
// @route   GET /api/v1/users/supervisor/students
// @access  Private (Admin and Supervisor)
exports.getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await User.find({
    role: VALID_ROLES.DOCTORAL_STUDENT,
    isActive: true,
  });
  res.status(200).json({ success: true, data: students });
});

// @desc    Get student by ID
// @route   GET /api/v1/users/supervisor/students/:id
// @access  Private (Admin and Supervisor)
exports.getStudentById = asyncHandler(async (req, res, next) => {
  const student = await User.findOne({
    _id: req.params.id,
    role: VALID_ROLES.DOCTORAL_STUDENT,
    isActive: true,
  });
  if (!student) {
    return next(
      new ErrorResponse(`Student not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: student });
});

// @desc    Update user details
// @route   PUT /api/v1/users/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const fieldsToUpdate = {
    firstName,
    lastName,
    email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Validation middleware for updateDetails
exports.validateUpdateDetails = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Please provide a valid email address"),
];

module.exports = exports;
