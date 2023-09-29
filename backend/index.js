const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

app.get("/",(req,res)=>{
    res.send("home page")
})
app.listen(8080,async()=>{
    try {
        await connection
        console.log("Server connected")
    } catch (error) {
        console.log(error)
        console.log("Server not connected")
    }
    console.log(`Server is running on port 8080`)
})