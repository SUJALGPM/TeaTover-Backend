const express = require('express');
const { totalYears } = require('../Controllers/yearController');
const { model } = require('mongoose');
const router = express.Router();

//Get API of total Years Fetched..
router.get("/get-total-years", totalYears);

module.exports = router;