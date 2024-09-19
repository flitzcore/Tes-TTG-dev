const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes');
mongoose.Promise = global.Promise;
dotenv.config();
const app = express();
const { errorConverter, errorHandler } = require('./utils/error');
var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', routes);
app.use(errorConverter);
app.use(errorHandler);
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URL, {}).then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    });
});
