const router = require('express').Router();
const user = require('../models/user.js');
const {authenticateToken} = require('./userAuth');