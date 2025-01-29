const express = require('express');
const {
  getProfile,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  disableUser,
  enableUser,
  getAllStudents,
  getStudentById,
  updateDetails,
  validateUpdateDetails
} = require('../controllers/userController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Apply protection to all routes
router.use(protect);

// Routes that all authenticated users can access
router.get('/profile', getProfile);
router.put('/updatedetails', validateUpdateDetails, updateDetails);

// Admin only routes
router.use(authorize('admin'));
router.route('/admin/users')
  .get(getAllUsers)
  .post(createUser);
router.route('/admin/users/:id')
  .get(getUserById)
  .put(updateUser);
router.put('/admin/users/:id/disable', disableUser);
router.put('/admin/users/:id/enable', enableUser);

// Supervisor routes (also accessible by admin)
router.use(authorize('admin', 'supervisor'));
router.get('/supervisor/students', getAllStudents);
router.get('/supervisor/students/:id', getStudentById);

module.exports = router;