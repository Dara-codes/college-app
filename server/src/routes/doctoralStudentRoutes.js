const express = require('express');
const {
  getProfile,
  updateProfile,
  validateUpdateProfile
} = require('../controllers/doctoralStudentController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// All routes are protected and only accessible by doctoral students
router.use(protect);
router.use(authorize('doctoral_student'));

router.get('/profile', getProfile);
router.put('/profile', validateUpdateProfile, updateProfile);

module.exports = router;