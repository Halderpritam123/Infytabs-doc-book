const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const oauthRoutes = require('./routes/oauthRoutes');
const authRoutes=require("./routes/authRoutes")
const availableSlotsRoutes = require('./routes/availableSlotsRoutes');
const bookedDataRoutes = require('./routes/bookedDataRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/available-slots', availableSlotsRoutes);
app.use('/api', bookedDataRoutes);

app.use('/', oauthRoutes);
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