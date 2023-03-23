const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', registerUser);

module.exports = router;