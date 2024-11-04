const express = require('express');
const {
  getProfile,
  updateProfile,
  validateUpdateProfile
} = require('../controllers/supervisorController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// All routes are protected and only accessible by supervisors
router.use(protect);
router.use(authorize('supervisor'));

router.get('/profile', getProfile);
router.put('/profile', validateUpdateProfile, updateProfile);

module.exports = router;