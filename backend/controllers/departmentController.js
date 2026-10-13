const Department = require('../models/Department');

exports.getDepartments = async (req, res) => {
    const departments = await Department.find().sort({ name: 1 });
    return res.json(departments);
};

exports.createDepartment = async (req, res) => {
    const department = await Department.create({
        name: req.body.name,
        description: req.body.description
    });
    return res.status(201).json(department);
};

exports.updateDepartment = async (req, res) => {
    const department = await Department.findByIdAndUpdate(
        req.params.id,
        { $set: { name: req.body.name, description: req.body.description } },
        { new: true, runValidators: true }
    );
    if (!department) {
        return res.status(404).json({ message: 'Department not found' });
    }
    return res.json(department);
};

exports.deleteDepartment = async (req, res) => {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
        return res.status(404).json({ message: 'Department not found' });
    }
    return res.json({ message: 'Department deleted successfully' });
};