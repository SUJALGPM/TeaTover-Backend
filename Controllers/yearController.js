const { yearModel } = require('../Modules/yearModel');


//Get Totol Year Controller...
const totalYearName = async (req, res) => {
    try {
        const fetchYears = await yearModel.find({});
        res.status(201).send({ message: "Total Years Fetched Successfully..", success: true, years: fetchYears });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to load the total years", success: false });
    }
}

module.exports = { totalYearName };