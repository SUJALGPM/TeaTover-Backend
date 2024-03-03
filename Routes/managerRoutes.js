const express = require("express");
const multer = require('multer');
const { managerRegister, managerLogin, createNewYear, createNewMonth } = require("../Controllers/managerController");
const router = express.Router();

//Manager Register Route....
router.post("/manager-register/:id", managerRegister);

//Manager Login Route...
router.post("/manager-login", managerLogin);

//Manager Create New Year Routes...
router.post("/manager-create-year/:id", createNewYear);

//Manager Create New Month Routes...
router.post("/manager-create-month/:mgrID/:yearName", createNewMonth);

module.exports = router;