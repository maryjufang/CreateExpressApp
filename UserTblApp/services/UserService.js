'use strict';

var express = require('express');
var multer = require('multer');
var moment = require('moment');
var fs = require('fs-extra');
var config = require('../app-config.js');
var UserModel = require('../models/UserModel.js');
var router = express.Router();

/* GET all UserModel. */
router.get('/', function(req, res, next) {
    UserModel.getUserList(req, function(result) {
        res.send(result);
    });
});

module.exports = router;
