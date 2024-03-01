const mongoose = require('mongoose');

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
    TotalYears: {
        type: [],
        default: []
    }
});

const managerModel = mongoose.model('Managers', managerSchema);

module.exports = managerModel;

