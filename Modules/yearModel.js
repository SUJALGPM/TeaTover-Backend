const mongoose = require('mongoose');

//Month Schema Structure...
const monthSchema = mongoose.Schema({
    monthName: String,
    TeaVendors: [{
        TeaVendorName: String,
        Chai: [{
            TotalSold: Number,
            PerPrice: Number,
            Date: {
                type: String,
                default: () => {
                    const currentDate = new Date();
                    const day = currentDate.getDate().toString().padStart(2, '0');
                    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
                    const year = currentDate.getFullYear();
                    return `${day}/${month}/${year}`;
                }
            },
            Time: {
                type: String,
                default: () => {
                    const currentTime = new Date();
                    const hours = currentTime.getHours().toString().padStart(2, '0');
                    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
                    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
                    return `${hours}:${minutes}:${seconds}`;
                }
            }
        }],
        Coffee: [{
            TotalSold: Number,
            PerPrice: Number,
            Date: {
                type: String, // Change the type to String
                default: () => {
                    const currentDate = new Date();
                    const day = currentDate.getDate().toString().padStart(2, '0');
                    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
                    const year = currentDate.getFullYear();
                    return `${day}/${month}/${year}`;
                }
            },
            Time: {
                type: String,
                default: () => {
                    const currentTime = new Date();
                    const hours = currentTime.getHours().toString().padStart(2, '0');
                    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
                    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
                    return `${hours}:${minutes}:${seconds}`;
                }
            }
        }]
    }],
    totalInvoice: Number,
    TotalSaleDays: Number
});

//Year Schema Structure...
const yearSchema = mongoose.Schema({
    YearWiseName: String,
    TotalMonth: [{ type: mongoose.Schema.Types.ObjectId, ref: "Month" }]
});



//Configure Model...
const yearModel = mongoose.model('Year', yearSchema);
const monthModel = mongoose.model('Month', monthSchema);

module.exports = { yearModel, yearSchema, monthModel };