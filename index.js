const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user');

// Build connection string from environment variables for safety.
// Set MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DB in your environment or .env file.
const MONGO_USER = process.env.MONGO_USER || 'AE_db_user';
const MONGO_PASS = process.env.MONGO_PASS || 'a2mdb5';  
const MONGO_HOST = process.env.MONGO_HOST || 'cluster0.dbv2f2o.mongodb.net';
const MONGO_DB = process.env.MONGO_DB || 'paymentDB';

if (!MONGO_PASS || MONGO_PASS === '<password>') {
    console.error('\nMissing or placeholder MongoDB password.\nSet MONGO_PASS in your environment or add a .env file with MONGO_PASS=yourPassword\nDo NOT commit secrets to source control.\n');
    // Exit with non-zero so CI / dev tools notice the misconfiguration.
    process.exit(1);
}

const encodedUser = encodeURIComponent(MONGO_USER);
const encodedPass = encodeURIComponent(MONGO_PASS);
const mongoUri = `mongodb+srv://${encodedUser}:${encodedPass}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;

console.log('Connecting to MongoDB — host:', MONGO_HOST, 'db:', MONGO_DB, 'user:', MONGO_USER);

mongoose.connect(mongoUri)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch(err => { console.error('MongoDB connection error:', err); });



//api endpoints would go here
app.use(express.json());
app.use('/api/users', userRoutes);
 
app.listen(3000, () => {
    console.log('Payment API is running on port 3000');
});