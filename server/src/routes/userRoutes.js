const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  approveSupervisor,
  getUsersByRole
} = require('../controllers/userController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Admin routes
router.use(authorize('admin'));
router.route('/')
  .get(getUsers)
  .post(createUser);

// Role-based routes
router.get('/role/:role', getUsersByRole);

// ID-based routes
router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);
router.put('/:id/approve-supervisor', approveSupervisor);

// Supervisor routes (also accessible by admin)
router.use(authorize('admin', 'supervisor'));
router.get('/supervisors', getUsersByRole);

// Student routes (accessible by all roles)
router.get('/students', getUsersByRole);

module.exports = router;