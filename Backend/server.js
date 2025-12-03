const express = require('express');
const app = express();
const Port = 3000;
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./database/connectdb');
const categoryRoutes = require('./routes/category.route');
const upload = require('./middleware/uploadImage');
const stadiumRoutes = require('./routes/stadium.route');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const sessionRoutes = require('./routes/session.route');
const bookRoutes = require('./routes/book.route');
const blogRoutes = require('./routes/blog.route');
const commentRoutes = require('./routes/comment.route');
const cors = require('cors');
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/stadium', stadiumRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sessions', sessionRoutes);
app.use('/api/v1/bookings', bookRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/comments', commentRoutes);

connectDB();
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});