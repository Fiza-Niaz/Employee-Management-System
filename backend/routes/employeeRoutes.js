const express = require('express');
const {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');
const requireObjectBody = require('../middleware/requireObjectBody');

const router = express.Router();

router.use(authenticate, requireAdmin);
router.get('/', getEmployees);
router.post('/', requireObjectBody, createEmployee);
router.get('/:id', getEmployee);
router.put('/:id', requireObjectBody, updateEmployee);
router.patch('/:id', requireObjectBody, updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;