const express = require('express');
const app = express();
const Port = 3000;
const dotenv = require('dotenv');
const connectDB = require('./database/connectdb');
const categoryRoutes = require('./routes/category.route');
const upload = require('./middleware/uploadImage');
const stadiumRoutes = require('./routes/stadium.route');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const sessionRoutes = require('./routes/session.route');
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/stadium', stadiumRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sessions', sessionRoutes);

connectDB();
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});