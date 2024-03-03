const express = require("express");
const { adminRegister, adminLogin } = require("../Controllers/adminController");
const router = express.Router();

//Admin Register Routes...
router.post("/admin-register", adminRegister);

//Admin Login Routes....
router.post("/admin-login", adminLogin);


module.exports = router;