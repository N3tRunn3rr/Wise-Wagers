const mongoose = require('mongoose');

//mongodb://localhost/social-network-api
mongoose.connect( 
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/perfect-parlay',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;