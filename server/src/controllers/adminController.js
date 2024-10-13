const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Approve a supervisor
// @route   PUT /api/v1/admin/approve-supervisor/:id
// @access  Private/Admin
exports.approveSupervisor = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`No user with the id of ${req.params.id}`, 404));
  }

  if (user.role !== 'supervisor') {
    return next(new ErrorResponse(`User is not a supervisor`, 400));
  }

  user.isApproved = true;
  await user.save();

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get all unapproved supervisors
// @route   GET /api/v1/admin/unapproved-supervisors
// @access  Private/Admin
exports.getUnapprovedSupervisors = asyncHandler(async (req, res, next) => {
  const supervisors = await User.find({ role: 'supervisor', isApproved: false });

  res.status(200).json({
    success: true,
    count: supervisors.length,
    data: supervisors
  });
});