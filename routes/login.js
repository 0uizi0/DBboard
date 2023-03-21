const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 1) {
      if (data[0].PASSWORD === req.body.password) {
        req.session.login = true;
        req.session.userId = req.body.id;
        res.status(200);
        res.redirect('/board');
      } else {
        res.status(400).send('비밀번호가 다릅니다.<br/><a href="/login">로그인 페이지로 이동</a>');
      }
    } else {
      res.status(400).send('해당 ID가 존재하지 않습니다.<br/><a href="/register">회원가입 페이지로 이동</a>')
    }
  });
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;