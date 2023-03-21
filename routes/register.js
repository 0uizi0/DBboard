const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 0) {
      userDB.registerUser(req.body, (result) => {
        if (result.affectedRows >= 1) {
          res.status(200).send('회원 가입에 성공하였습니다.<br/><a href="/login">로그인 페이지로 이동</a>');
        } else {
          res.status(404).send('회원 가입에 실패하였습니다.<br/><a href="/register">회원가입 페이지로 이동</a>');
        }
      });
    } else {
      res.status(400).send('동일한 ID를 가진 회원이 존재합니다. <br/><a href="/register">회원가입으로 이동</a>');
    }
  })
})

module.exports = router;