const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

// 로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login) {
    next();
  } else {
    res.status(400).send('로그인이 필요한 서비스입니다.<br/><a href="/login">로그인 페이지로 이동</a>');
  }
}

// 글 전체 목록 보여주기
router.get('/', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    const POST = data;
    const postCnts = POST.length;
    const { userId } = req.session;
    res.render('board', {POST, postCnts, userId});
  })
});

// 글쓰기
// 글쓰기 모드로 이동
router.get('/write', isLogin, (req, res) => {
  res.render('board_write')
});
// 게시물 추가
router.post('/write', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    const newPost= {
      id: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };
    boardDB.writePost(newPost, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/board');
      } else {
        const err = new Error('글쓰기가 실패하였습니다.');
        throw err;
      }
    })
  } else {
    const err = new Error('데이터 값이 들어오지 않았습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정
// 글 수정 모드로 이동
router.get('/modify/:id', isLogin, (req, res) => {
  boardDB.getPost(req.params.id,(data) => {
    if (data.length > 0) {
      res.render('board_modify', {selectedPost: data[0]});
    }
  });
});
// 게시물 수정
router.post('/modify/:id', isLogin, (req, res)=>{
  if (req.body.title && req.body.content) {
    boardDB.modifyPost(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/board');
      } else {
        const err = new Error ('글 수정이 실패하였습니다.');
        throw err;
      }
    })
  } else {
    const err = new Error ('글 제목 또는 내용이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

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