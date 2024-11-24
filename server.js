const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/authDB')
.then(()=>console.log('Connected to MongoDb'))
.catch(()=>console.log("Database Connection Failed ", err)
);

//test route
app.get('/', (req, res)=>{
    res.send("Server is running");
});

const PORT = 5000;
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));