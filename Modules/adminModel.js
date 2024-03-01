const mongoose = require('mongoose');
const managerSchema = require("./managerModel");

const adminSchema = mongoose.Schema({
    adminID: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: false
    },
    adminPassword: {
        type: String,
        required: false
    },
    TotalManagers: {
        type: [managerSchema.managerSchema],
        default: []
    }
}, { timestamps: true });


const adminModel = mongoose.model("Admins", adminSchema,);

module.exports = adminModel;