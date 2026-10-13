require('dotenv').config();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const seedAdmin = async () => {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
        throw new Error('ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be set to seed the administrator');
    }
    if (!ADMIN_NAME.trim() || !ADMIN_EMAIL.trim()) {
        throw new Error('ADMIN_NAME and ADMIN_EMAIL cannot be blank');
    }
    if (ADMIN_PASSWORD.length < 12 || ADMIN_PASSWORD.startsWith('replace-with-')) {
        throw new Error('ADMIN_PASSWORD must be a non-placeholder value of at least 12 characters');
    }

    await connectDB();

    const email = ADMIN_EMAIL.trim().toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        if (existingUser.role !== 'admin') {
            throw new Error(`An account for ${email} already exists and is not an administrator`);
        }
        console.log(`Administrator ${email} already exists`);
        return;
    }

    const password = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({
        name: ADMIN_NAME.trim(),
        email,
        password,
        role: 'admin'
    });
    console.log(`Administrator ${email} created`);
};

seedAdmin()
    .catch((error) => {
        console.error('Failed to seed administrator:', error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
