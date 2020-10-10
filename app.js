const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load env
dotenv.config({ path: "./config.env" });

const app = express();

// Connect to DB
mongoose.connect(
    "mongodb+srv://nemo:iQWoQmaawImqiYH3@cluster0.p34fz.mongodb.net/rest_api_deved?retryWrites=true&w=majority",
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

app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/posts', (req, res) => {
    res.send('We are on posts');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`);
});
