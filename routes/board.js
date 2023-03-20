const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

const POST = [
  {
    title: 'title1',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla, itaque nihil perspiciatis cum facilis deserunt aliquid architecto quaerat non quisquam velit, ad, repellendus laboriosam magnam delectus hic enim blanditiis?'
  },
  {
    title: 'title2',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla, itaque nihil perspiciatis cum facilis deserunt aliquid architecto quaerat non quisquam velit, ad, repellendus laboriosam magnam delectus hic enim blanditiis?'
  }
];

// 글 전체 목록 보여주기
router.get('/', (req, res) => {
  boardDB.getAllArticles((data) => {
    console.log(data);
    const POST = data;
    const postCnts = POST.length;
    res.render('board', {POST, postCnts});
  })
});

// 글쓰기
// 글쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('board_write')
});
// 게시물 추가
router.post('/write', (req, res) => {
  console.log(req.body);
  if (req.body.title && req.body.content) {
    boardDB.writePost(req.body, (data) => {
      console.log(data);
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
router.get('/modify/:id', (req, res) => {
  boardDB.getPost(req.params.id,(data) => {
    console.log(data);
    if (data.length > 0) {
      res.render('board_modify', {selectedPost: data[0]});
    }
  });
});
// 게시물 수정
router.post('/modify/:id', (req, res)=>{
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
router.delete('/delete/:id', (req, res)=> {
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