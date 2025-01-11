const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/connection');

const app = express();
const PORT = 3000;


//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

//ROUTES
const taskRoutes = require('./routes/tasks');


//Define the home page
app.get( '/', (req, res) => {
    res.sendFile( __dirname + '/views/index.html');
});

//USE EXTERNAL ROUTES
app.use('/api/tasks', taskRoutes);

//Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

