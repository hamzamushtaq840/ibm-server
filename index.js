const express = require('express');
const dotenv = require('dotenv')
const app = express();
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books.js');
const userRoutes = require('./routes/users.js');


dotenv.config({ path: "./.env" })
mongoose.set('strictQuery', true);
app.use(express.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB CONNECTED');
    })
    .catch((e) => {
        console.log(e);
    })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});