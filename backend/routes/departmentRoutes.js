const express = require('express');
const {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} = require('../controllers/departmentController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');
const requireObjectBody = require('../middleware/requireObjectBody');

const router = express.Router();

router.use(authenticate, requireAdmin);
router.get('/', getDepartments);
router.post('/', requireObjectBody, createDepartment);
router.put('/:id', requireObjectBody, updateDepartment);
router.patch('/:id', requireObjectBody, updateDepartment);
router.delete('/:id', deleteDepartment);

module.exports = router;