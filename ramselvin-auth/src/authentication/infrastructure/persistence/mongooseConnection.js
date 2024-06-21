const mongoose = require('mongoose');

const connectToDatabase = async () => {
    const dbUri = '';
    try {
        await mongoose.connect(dbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;
