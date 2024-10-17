const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

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
  const includeInactive = req.query.includeInactive === 'true';
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
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: user });
});

// @desc    Create user
// @route   POST /api/v1/users/admin/users
// @access  Public (for first admin) / Private (Admin only for subsequent creations)
exports.createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Check if this is the first admin being created
  const adminCount = await User.countDocuments({ role: 'admin' });
  
  if (adminCount === 0 && role === 'admin') {
    // This is the first admin, allow creation without authorization
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: 'admin'
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } else if (role === 'admin' && (!req.user || req.user.role !== 'admin')) {
    // If trying to create an admin and the requester is not an admin
    return next(new ErrorResponse('Not authorized to create admin accounts', 403));
  } else {
    // For all other cases, proceed with normal user creation
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role
    });

    res.status(201).json({
      success: true,
      data: user
    });
  }
});

// @desc    Update user
// @route   PUT /api/v1/users/admin/users/:id
// @access  Private (Admin only)
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: user });
});

// @desc    Disable user (soft delete)
// @route   PUT /api/v1/users/admin/users/:id/disable
// @access  Private (Admin only)
exports.disableUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  if (!user.isActive) {
    return next(new ErrorResponse(`User is already disabled`, 400));
  }

  user.isActive = false;
  await user.save();

  res.status(200).json({ 
    success: true, 
    message: 'User has been disabled',
    data: { id: user._id, isActive: user.isActive }
  });
});

// @desc    Enable user
// @route   PUT /api/v1/users/admin/users/:id/enable
// @access  Private (Admin only)
exports.enableUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  if (user.isActive) {
    return next(new ErrorResponse(`User is already active`, 400));
  }

  user.isActive = true;
  await user.save();

  res.status(200).json({ 
    success: true, 
    message: 'User has been enabled',
    data: { id: user._id, isActive: user.isActive }
  });
});

// @desc    Get all students
// @route   GET /api/v1/users/supervisor/students
// @access  Private (Admin and Supervisor)
exports.getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await User.find({ role: 'student', isActive: true });
  res.status(200).json({ success: true, data: students });
});

// @desc    Get student by ID
// @route   GET /api/v1/users/supervisor/students/:id
// @access  Private (Admin and Supervisor)
exports.getStudentById = asyncHandler(async (req, res, next) => {
  const student = await User.findOne({ _id: req.params.id, role: 'student', isActive: true });
  if (!student) {
    return next(new ErrorResponse(`Student not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: student });
});

module.exports = exports;


// @desc    Approve supervisor
// @route   PUT /api/v1/users/:id/approve-supervisor
// @access  Private/Admin
// exports.approveSupervisor = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
//   }
//   if (user.role !== 'supervisor') {
//     return next(new ErrorResponse(`User is not a supervisor`, 400));
//   }
//   user.isSupervisorApproved = true;
//   await user.save();
//   res.status(200).json({ success: true, data: user });
// });