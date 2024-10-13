const express = require('express');
const {
  approveSupervisor,
  getUnapprovedSupervisors
} = require('../controllers/adminController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.put('/approve-supervisor/:id', approveSupervisor);
router.get('/unapproved-supervisors', getUnapprovedSupervisors);

module.exports = router;