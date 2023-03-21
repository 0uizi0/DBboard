const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {cookie: req.cookies.cookie});
})

router.get('/cook', (req, res) => {
  res.cookie('cookie', true, {
    maxAge: 1000 * 5,
    httpOnly: false,
  });
  res.send('쿠키 굽기 성공');
})

module.exports = router;