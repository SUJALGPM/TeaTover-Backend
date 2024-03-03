const express = require('express');
const { totalYearName } = require('../Controllers/yearController');
const { model } = require('mongoose');
const router = express.Router();

//Get API of total Years Fetched..
router.get("/get-total-years", totalYearName);

module.exports = router;