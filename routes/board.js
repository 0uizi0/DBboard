const express = require('express');
const { 
  getAllPosts,
  writePost,
  getPost,
  modifyPost,
} = require('../controllers/boardController');

const router = express.Router();

// 로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(400).send('로그인이 필요한 서비스입니다.<br/><a href="/login">로그인 페이지로 이동</a>');
  }
}

// 글 전체 목록 보여주기
router.get('/', isLogin, getAllPosts);

// 글쓰기
// 글쓰기 모드로 이동
router.get('/write', isLogin, (req, res) => {
  res.render('board_write')
});
// 게시물 추가
router.post('/write', isLogin, writePost);

// 글 수정
// 글 수정 모드로 이동
router.get('/modify/:id', isLogin, getPost);
// 게시물 수정
router.post('/modify/:id', isLogin, modifyPost);

// 글 삭제
router.delete('/delete/:id', isLogin, (req, res)=> {
  boardDB.deletePost(req.params.id, (data) => {
    if (data.affectedRows >= 1) {
      res.send('삭제가 완료되었습니다.');
    } else {
      const err = new Error('글 삭제가 실패하였습니다.');
      err.statusCode = 500;
      throw err;
    }
  })
});

module.exports = router;