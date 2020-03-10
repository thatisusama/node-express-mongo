const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({message: 'Server is up'})
})

module.exports = router;