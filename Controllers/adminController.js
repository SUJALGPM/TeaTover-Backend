const adminModel = require("../Modules/adminModel");

//Register Controller...
const adminRegister = async (req, res) => {
    try {
        const { ID, NAME, EMAIL, PASSWORD } = req.body;

        //Check the admin already exist or not..
        const adminExist = await adminModel.findOne({ adminID: ID });
        if (adminExist) {
            return res.status(500).send({ message: "Admin Already Exist..!!!", success: false });
        }

        //Format data before store...
        const formatData = {
            adminID: ID,
            adminEmail: EMAIL,
            adminName: NAME,
            adminPassword: PASSWORD
        }

        //Store in database...
        const createNewAdmin = new adminModel(formatData);
        const savedAdmin = await createNewAdmin.save();

        res.status(201).send({ message: "New Admin Create Successfully", success: true, data: savedAdmin });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to create a new Admin..!!!", success: false });
    }
}

module.exports = { adminRegister };
