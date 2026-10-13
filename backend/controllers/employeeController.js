const Employee = require('../models/Employee');

const employeeFields = ['name', 'email', 'phone', 'address', 'salary', 'department', 'image'];

const pickEmployeeFields = (body) => Object.fromEntries(
    employeeFields
        .filter((field) => Object.prototype.hasOwnProperty.call(body, field))
        .map((field) => [field, body[field]])
);

exports.getEmployees = async (req, res) => {
    const employees = await Employee.find().sort({ name: 1 });
    return res.json(employees);
};

exports.getEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json(employee);
};

exports.createEmployee = async (req, res) => {
    const employee = await Employee.create(pickEmployeeFields(req.body));
    return res.status(201).json(employee);
};

exports.updateEmployee = async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        { $set: pickEmployeeFields(req.body) },
        { new: true, runValidators: true }
    );
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json(employee);
};

exports.deleteEmployee = async (req, res) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json({ message: 'Employee deleted successfully' });
};