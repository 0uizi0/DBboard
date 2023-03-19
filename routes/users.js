const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('user', {user: 'admin'});
});

module.exports = router;