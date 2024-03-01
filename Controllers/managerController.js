const managerModel = require("../Modules/managerModel");


//Register Controller.....
const managerRegister = async (req, res) => {
    try {
        const { ID, NAME, EMAIL, PASSWORD } = req.body;

        const managerExist = await managerModel.findOne({ managerID :ID});
        if(managerExist){
            return res.status(500).send({message:""})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to create a new Manager...!!!", success: false });
    }
}

module.exports = { managerRegister };