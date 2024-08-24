require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());



// routes
app.use('/register', require('./routes/admin'));
app.use('/student', require('./routes/student'));
app.use('/teacher', require('./routes/teacher'));
app.use('/facultyadmin', require('./routes/facultyAdmin'));
app.use('/admin', require('./routes/admin'));
app.use('/studentauth', require('./routes/studentAuth'));
app.use('/adminauth', require('./routes/adminAuth'));
app.use('/teacherauth', require('./routes/teacherAuth'));
app.use('/facultyadminauth', require('./routes/facultyAdminAuth'));
app.use('/semester', require('./routes/semester'));
app.use('/faculty', require('./routes/faculty'));
app.use('/subject', require('./routes/subject'));
app.use('/result', require('./routes/result'));
app.use('/assessment', require('./routes/assessment'));

app.use(verifyJWT);


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});