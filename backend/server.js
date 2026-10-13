require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Invalid JSON request body' });
    }
    if (error.name === 'ValidationError' || error.name === 'CastError' || error.code === 11000) {
        return res.status(400).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
});

const start = async () => {
    if (
        !process.env.JWT_SECRET ||
        process.env.JWT_SECRET.length < 32 ||
        process.env.JWT_SECRET.startsWith('replace-with-')
    ) {
        throw new Error('JWT_SECRET must be set to a random value of at least 32 characters');
    }
    await connectDB();
    app.listen(port, () => console.log(`Server listening on port ${port}`));
};

if (require.main === module) {
    start().catch((error) => {
        console.error('Failed to start server:', error.message);
        process.exitCode = 1;
    });
}

module.exports = app;