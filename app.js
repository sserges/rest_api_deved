const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import Routes
const postsRoutes = require('./routes/posts')

// Load env
// dotenv.config({ path: "./config.env" });
require('dotenv/config');

const app = express();
app.use(bodyParser.json());
// app.use(express.json());

// Connect to DB
mongoose.connect(
    process.env.MONGO_DB_URI,
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log('Connected to DB!');
    }
);

// Dev logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use('/posts', postsRoutes);

app.get('/', (req, res) => {
    res.send('We are on home');
});





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`);
});
