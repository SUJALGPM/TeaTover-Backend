const adminModel = require("../Modules/adminModel");
const mgrModel = require("../Modules/managerModel");


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
        const managerExist = await mgrModel.managerModel.findOne({ managerID: ID });
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
        const newManager = new mgrModel.managerModel(formatData);
        const saveNewMgr = await newManager.save();

        if (saveNewMgr) {
            adminExist.TotalManagers.push(saveNewMgr);
            await adminExist.save();
        }

        res.status(201).send({ message: "New Manager Create Successfully...", success: true, data: saveNewMgr });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to create a new Manager...!!!", success: false });
    }
}


module.exports = { managerRegister };