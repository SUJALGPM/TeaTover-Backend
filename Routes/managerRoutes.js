const express = require("express");
const multer = require('multer');
const { managerRegister, managerLogin, createNewYear, createNewMonth, managerEntry, managerYearDetail, managerGetMonthDetail, managerExpenses } = require("../Controllers/managerController");
const router = express.Router();

//Manager Register Route....
router.post("/manager-register/:id", managerRegister);

//Manager Login Route...
router.post("/manager-login", managerLogin);

//Manager Create New Year Routes...
router.post("/manager-create-year/:id", createNewYear);

//Manager Create New Month Routes...
router.post("/manager-create-month/:mgrID/:yearName", createNewMonth);

//Manager Record New Entry Routes...
router.post("/manager-record-entry/:mgrID/:yearNAME/:monthNAME", managerEntry);

//Manager Get total Years with month detials Routes...
router.get("/manager-years-detail/:mgrID", managerYearDetail);

//Manager Get total Months with there details Routes...
router.get("/manager-month-detail/:yearID", managerGetMonthDetail);

//Manager Get total Expenses with all data Routes..
router.get("/manager-expenses-detail/:mgrID", managerExpenses);


module.exports = router;