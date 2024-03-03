const adminModel = require("../Modules/adminModel");
const { managerModel } = require("../Modules/managerModel");
const { yearModel, monthModel } = require("../Modules/yearModel");
const jwt = require("jsonwebtoken");

//Register Controller.....
const managerRegister = async (req, res) => {
    try {
        const { ID, NAME, EMAIL, PASSWORD } = req.body;

        const adminID = req.params.id;

        //Check the admin already exist or not...
        const adminExist = await adminModel.findById(adminID).populate('TotalManagers');
        if (!adminExist) {
            return res.status(404).send({ message: "Admin not found..!!", success: false });
        }

        //Check the manager already exist or not...
        const managerExist = await managerModel.findOne({ managerID: ID });
        if (managerExist) {
            return res.status(500).send({ message: "Manager is already Exist..!!!", success: false });
        }

        //format Data...
        const formatData = {
            managerID: ID,
            managerName: NAME,
            managerEmail: EMAIL,
            managerPassword: PASSWORD
        }

        //Store data in database...
        const newManager = new managerModel(formatData);
        await newManager.save();
        console.log("ID :", newManager._id);

        adminExist.TotalManagers.push(newManager._id);
        await adminExist.save();

        res.status(201).send({ message: "New Manager Create Successfully...", success: true, data: newManager });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to create a new Manager...!!!", success: false });
    }
}

//Login Controller....
const managerLogin = async (req, res) => {
    try {
        const { ID, PASSWORD } = req.body;

        //Check the manager is exist or not...
        const managerExist = await managerModel.findOne({ managerID: ID });
        if (!managerExist) {
            return res.status(404).send({ message: "Manager is not exist...!!!", success: false });
        }

        //Check the password length...
        if (PASSWORD.length < 5) {
            return res.status(500).send({ message: "Password must be greater than 5 letter..!!", success: false });
        }

        //Check the password match or not....
        if (managerExist.managerPassword !== PASSWORD) {
            return res.status(500).send({ message: "Invalid Credentials..!!!!", success: false });
        }

        //Generate the jwt token for 1day...
        const token = jwt.sign({ id: managerExist._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.status(201).send({ message: "Manager Successfully Login...", success: true, token, managerExist });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Manager Failed to login..!!!", success: false });
    }
}

//Create a New Year to track record Controller...
const createNewYear = async (req, res) => {
    try {
        const managerID = req.params.id;
        const { yearName } = req.body;

        //Check the Manager exist or not..
        const managerExist = await managerModel.findById(managerID).populate('TotalYears');
        if (!managerExist) {
            return res.status(404).send({ message: "Manager Not Found..!!!", success: false });
        }

        //Check the year already or not...
        const yearExist = await yearModel.findOne({ YearWiseName: yearName });
        if (yearExist) {
            return res.status(500).send({ message: "Year is already exist..!!!", success: false });
        }

        //Format data before store...
        const formatData = {
            YearWiseName: yearName
        }

        //Store the year in database...
        const createNewYear = new yearModel(formatData);
        await createNewYear.save();

        //Push new created year to manager data...
        managerExist.TotalYears.push(createNewYear._id);
        await managerExist.save();

        res.status(201).send({ message: "New Year Create Successfully..", success: true, createdYear: createNewYear });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to create a new year..!!!", success: false });
    }
}

//Create a New Month to track record Controller...
const createNewMonth = async (req, res) => {
    try {
        const managerID = req.params.mgrID;
        const yearNAME = req.params.yearName;
        const monthNAME = req.body.monthNAME;

        //Check the manager exist or not...
        const managerExist = await managerModel.findById(managerID);
        if (!managerExist) {
            return res.status(404).send({ message: "Manager not found..!!!", success: false });
        }

        //Check the year is exist or not...
        const yearExist = await yearModel.findOne({ YearWiseName: yearNAME }).populate('TotalMonth');
        if (!yearExist) {
            return res.status(404).send({ message: "Year not found...!!!", success: false });
        }

        //Format Data before store in databse...
        const formatData = {
            monthName: monthNAME
        }

        //Save in month model....
        const newMonth = new monthModel(formatData);
        await newMonth.save();

        //Push the newly created month to year model...
        yearExist.TotalMonth.push(newMonth._id);
        await yearExist.save();

        res.status(201).send({ message: "Successfully created New Month...", success: true, month: newMonth });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to create new month..!!!", success: false });
    }
}

//Manager Entry Controller...
const managerEntry = async (req, res) => {
    try {
        const managerID = req.params.mgrID;
        const yearNAME = req.params.yearNAME;
        const monthNAME = req.params.monthNAME;

        const { TeaVendorName, chaiTotalSold, chaiPerPrice, coffeeTotalSold, coffeePerPrice } = req.body;

        //Check the manager is exist or not...
        const managerExist = await managerModel.findById(managerID);
        if (!managerExist) {
            return res.status(500).send({ message: "Manager not found..!!", success: false });
        }

        //Check Year is exist or not...
        const yearExist = await yearModel.findOne({ YearWiseName: yearNAME }).populate('TotalMonth');
        if (!yearExist) {
            return res.status(404).send({ message: "Year not found..!!", successL: false });
        }

        //Check the month is exist or not....
        const monthExist = await monthModel.findOne({ monthName: monthNAME });
        if (!monthExist) {
            return res.status(404).send({ message: "Month not found..!!!", success: false });
        }

        //Check the specific teaVendor is exist or not to insert entry....
        let teaVendorExist = monthExist.TeaVendors.findIndex(vendor => vendor.TeaVendorName === TeaVendorName);
        if (teaVendorExist === -1) {
            // If the tea vendor does not exist, create a new one...
            const newTeaVendor = { TeaVendorName: TeaVendorName, Chai: [], Coffee: [] }
            monthExist.TeaVendors.push(newTeaVendor);
            teaVendorExist = monthExist.TeaVendors.length - 1;
            await monthExist.save();
        }

        //Now Record New Entry....
        const chaiFormatData = {
            TotalSold: chaiTotalSold,
            PerPrice: chaiPerPrice
        }
        //Push the record to Chai Entry...
        monthExist.TeaVendors[teaVendorExist].Chai.push(chaiFormatData);

        //Now Record New Entry....
        const coffeeFormatData = {
            TotalSold: coffeeTotalSold,
            PerPrice: coffeePerPrice
        }
        //Push the record to Coffee Entry....
        monthExist.TeaVendors[teaVendorExist].Coffee.push(coffeeFormatData);

        //Record Calculation....
        const totalOfChaiInvoice = chaiPerPrice * chaiTotalSold;
        const totalOfCoffeeInvoice = coffeePerPrice * coffeeTotalSold;
        console.log("Total Chai : ", totalOfChaiInvoice);
        console.log("Total coffee : ", totalOfCoffeeInvoice);
        console.log("Total Price : ", totalOfChaiInvoice + totalOfCoffeeInvoice);

        //Update the total Invoice after new entry....
        monthExist.totalInvoice = (monthExist.totalInvoice || 0) + (totalOfChaiInvoice + totalOfCoffeeInvoice);

        //Update the total days(length of TeaVendors) after new entry...
        monthExist.TotalSaleDays = (monthExist.TotalSaleDays || 0) + 1;

        //Save the data in database...
        await monthExist.save();

        res.status(201).send({ message: "New Entry Successfully Record...", success: true });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to entry the record..!!!", success: false });
    }
}



module.exports = { managerRegister, managerLogin, createNewYear, managerEntry, createNewMonth };