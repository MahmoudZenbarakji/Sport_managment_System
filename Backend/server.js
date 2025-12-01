const express = require('express');
const app = express();
const Port = 3000;
const dotenv = require('dotenv');
const connectDB = require('./database/connectdb');
const categoryRoutes = require('./routes/category.route');
const upload = require('./middleware/uploadImage');
const stadiumRoutes = require('./routes/stadium.route');
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/stadium', stadiumRoutes);

connectDB();
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});