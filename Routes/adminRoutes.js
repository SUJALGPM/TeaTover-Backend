const express = require("express");
const { adminRegister } = require("../Controllers/adminController");
const router = express.Router();

//Admin Register Routes...
router.post("/admin-register", adminRegister);


module.exports = router;