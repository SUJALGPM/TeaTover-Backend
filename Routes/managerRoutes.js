const express = require("express");
const multer = require('multer');
const { managerRegister } = require("../Controllers/managerController");
const router = express.Router();

//Manager Register Route....
router.post("/manager-register/:id", managerRegister);


module.exports = router;