const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/role');
const {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
  getAllUsers,
  deleteUser,
} = require('../controllers/taskController');

// ─── ADMIN ROUTES (must be before /:id to avoid conflicts) ───────────────────
router.get('/admin/all', protect, authorizeRoles('admin'), getAllTasks);
router.get('/admin/users', protect, authorizeRoles('admin'), getAllUsers);
router.delete('/admin/users/:id', protect, authorizeRoles('admin'), deleteUser);

// ─── USER ROUTES ─────────────────────────────────────────────────────────────
router.route('/').get(protect, getMyTasks).post(protect, createTask);
router
  .route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
