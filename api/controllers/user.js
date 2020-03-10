const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const User = require('../models/User');

exports.me = asyncHandler(async (req, res, next) => {
  return res.json({ success: true, data: req.user });
})

exports.getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorResponse('User not found', 400)
    )
  }

  return res.json({ success: true, data: user })
})