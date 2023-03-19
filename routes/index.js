const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {msg: '데이터 전달'});
});

module.exports = router;