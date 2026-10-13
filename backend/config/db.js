const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGODB_URI (or MONGO_URI) must be configured');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
};

module.exports = connectDB;