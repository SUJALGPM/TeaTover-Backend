const mongoose = require('mongoose');

const yearModelSchema = mongoose.Schema({
    YearWise: String,
    TotalMonth: [{
        monthName: String,
        TeaVendors: [{
            TeaVendorName: String,
            Chai: [{
                TotalSold: String,
                PerPrice: String,
                Date: { type: Date, default: Date.now },
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
                TotalSold: String,
                PerPrice: String,
                Date: { type: Date, default: Date.now },
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
    }],
    TotalYears: { type: mongoose.Schema.Types.ObjectId, ref: 'Managers' }
});

const yearModel = mongoose.model('YearModel', yearModelSchema);

module.exports = { yearModel, yearModelSchema };