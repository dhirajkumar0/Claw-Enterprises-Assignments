const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);
