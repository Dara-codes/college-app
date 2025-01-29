const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const TrainingModule = require('../models/trainingModule');

// @desc    Get all training modules
// @route   GET /api/v1/training-modules
// @access  Private
exports.getTrainingModules = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = TrainingModule.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await TrainingModule.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const trainingModules = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: trainingModules.length,
    pagination,
    data: trainingModules
  });
});

// @desc    Get single training module
// @route   GET /api/v1/training-modules/:id
// @access  Private
exports.getTrainingModule = asyncHandler(async (req, res, next) => {
  const trainingModule = await TrainingModule.findById(req.params.id);

  if (!trainingModule) {
    return next(
      new ErrorResponse(`Training module not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: trainingModule
  });
});

// @desc    Create new training module
// @route   POST /api/v1/training-modules
// @access  Private (Admin only)
exports.createTrainingModule = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.createdBy = req.user.id;

  const trainingModule = await TrainingModule.create(req.body);

  res.status(201).json({
    success: true,
    data: trainingModule
  });
});

// @desc    Update training module
// @route   PUT /api/v1/training-modules/:id
// @access  Private (Admin only)
exports.updateTrainingModule = asyncHandler(async (req, res, next) => {
  let trainingModule = await TrainingModule.findById(req.params.id);

  if (!trainingModule) {
    return next(
      new ErrorResponse(`Training module not found with id of ${req.params.id}`, 404)
    );
  }

  trainingModule = await TrainingModule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: trainingModule
  });
});

// @desc    Delete training module
// @route   DELETE /api/v1/training-modules/:id
// @access  Private (Admin only)
exports.deleteTrainingModule = asyncHandler(async (req, res, next) => {
  const trainingModule = await TrainingModule.findById(req.params.id);

  if (!trainingModule) {
    return next(
      new ErrorResponse(`Training module not found with id of ${req.params.id}`, 404)
    );
  }

  await trainingModule.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});