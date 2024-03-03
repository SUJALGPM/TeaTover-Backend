const mongoose = require('mongoose');
const { managerSchema } = require("./managerModel");

const adminSchema = mongoose.Schema({
    adminID: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        required: false
    },
    adminEmail: {
        type: String,
        required: false
    },
    adminPassword: {
        type: String,
        required: false
    },
    adminTrue: {
        type: Boolean,
        default: true
    },
    TotalManagers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Managers' }]
}, { timestamps: true });


const adminModel = mongoose.model("Admins", adminSchema,);

module.exports = adminModel;