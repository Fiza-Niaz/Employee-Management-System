const mongoose = require('mongoose');
const dns = require('node:dns');

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGODB_URI (or MONGO_URI) must be configured');
    }

    const dnsServers = (process.env.DNS_SERVERS || '')
        .split(',')
        .map((server) => server.trim())
        .filter(Boolean);
    if (dnsServers.length > 0) {
        dns.setServers(dnsServers);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
};

module.exports = connectDB;