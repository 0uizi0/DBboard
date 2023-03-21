const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('test');
})

router.get('/cook', (req, res) => {
  res.cookie('alert', true, {
    expires: new Date(Date.now() + 1000 * 60),
    httpOnly: false,
  });
  console.log(req.cookies.alert);
  res.render('index', {alert: req.cookies.alert});
})

module.exports = router;