const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
        
      
       // default: 'https://via.placeholder.com/150'
    }, 

    
});

module.exports = mongoose.model('Employee', EmployeeSchema);