const express = require('express');
const app = express();
const Port = 3000;
const dotenv = require('dotenv');
const connectDB = require('./database/connectdb');
const categoryRoutes = require('./routes/category.route');
const upload = require('./middleware/uploadImage');
dotenv.config();

app.use('/api/v1/category', upload.single('image'), categoryRoutes);


connectDB();
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});