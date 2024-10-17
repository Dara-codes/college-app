const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  disableUser,
  enableUser,
  getProfile,
  getAllStudents,
  getStudentById
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes for all authenticated users
router.get('/profile', getProfile);

// Admin routes
router.use('/admin', authorize('admin'));
router.route('/admin/users')
  .get(getAllUsers)
  .post(createUser);
router.route('/admin/users/:id')
  .get(getUserById)
  .put(updateUser);
router.put('/admin/users/:id/disable', disableUser);
router.put('/admin/users/:id/enable', enableUser);

// Supervisor routes (also accessible by admin)
router.use('/supervisor', authorize('admin', 'supervisor'));
router.get('/supervisor/students', getAllStudents);
router.get('/supervisor/students/:id', getStudentById);

module.exports = router;