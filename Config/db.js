const mongoose = require('mongoose');
const colors = require('colors');


//Create a connection with mongodb Atlas....
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`TeaTover Successfully Connected to Mongodb Atlas Database...`.bgGreen.white);
    } catch (err) {
        console.log(`Mongo server ${err}`.bgRed.white);
        console.log(`TeaTover Failed to connect to Database...`.bgRed.white);

    }
}

module.exports = connectDB;