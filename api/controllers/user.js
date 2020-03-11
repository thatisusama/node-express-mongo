const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const User = require('../models/User');

exports.me = asyncHandler(async (req, res, next) => {
  return res.json({ success: true, data: req.user });
})