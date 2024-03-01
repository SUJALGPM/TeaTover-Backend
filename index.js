const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const managerRoutes = require("./Routes/managerRoutes");
const adminRoutes = require("./Routes/adminRoutes");


//Configure the .env file...
dotenv.config();

//Configure the database connection..
connectDB();

//Rest object configure...
const app = express();

//Setup the Middlewares....
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static('uploads'));

//Routes configure setup...
app.use("/api/mgr", managerRoutes);
app.use("/api/adm", adminRoutes);

//Setup the server port....
const port = process.env.PORT || 7005

//Running the server...
app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port no ${process.env.PORT}`
        .bgCyan.white);
});