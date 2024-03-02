const mongoose = require('mongoose');
const yearModelSchema = require("./yearModel");

const managerSchema = mongoose.Schema({
    managerID: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: false
    },
    managerEmail: {
        type: String,
        required: false
    },
    managerPassword: {
        type: String,
        required: false
    },
    adminTrue: {
        type: Boolean,
        default: false
    },
    TotalYears: {
        type: [yearModelSchema.yearModelSchema],
        default: []
    },
    TotalManagers: { type: mongoose.Schema.Types.ObjectId, ref: 'Admins' }
});

const managerModel = mongoose.model('Managers', managerSchema);

module.exports = { managerModel, managerSchema };

