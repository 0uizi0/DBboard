const express = require('express');
const { loginUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', loginUser);

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});

module.exports = router;