const express = require('express');
const {
  getTrainingModules,
  getTrainingModule,
  createTrainingModule,
  updateTrainingModule,
  deleteTrainingModule
} = require('../controllers/trainingModuleController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getTrainingModules)
  .post(protect, authorize('admin'), createTrainingModule);

router
  .route('/:id')
  .get(protect, getTrainingModule)
  .put(protect, authorize('admin'), updateTrainingModule)
  .delete(protect, authorize('admin'), deleteTrainingModule);

module.exports = router;