const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorResponse('No user found with this id', 401));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    if (!roles.includes(req.user.role)) {
      // Special case: Allow creation of first admin
      if (req.method === 'POST' && req.path.endsWith('/users') && req.body.role === 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount === 0) {
          return next();
        }
      }
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
    }

    if (req.user.role === 'supervisor' && !req.user.isSupervisorApproved) {
      return next(new ErrorResponse('Supervisor account is not approved yet', 403));
    }

    next();
  });
};