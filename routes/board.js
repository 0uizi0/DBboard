const express = require('express');

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
  const postCnts = POST.length;
  res.render('board', {POST, postCnts});
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
    const newPost = {
      title: req.body.title,
      content: req.body.content
    };
    POST.push(newPost);

    res.redirect('/board');
  } else {
    const err = new Error('데이터 값이 들어오지 않았습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정
// 글 수정 모드로 이동
router.get('/modify/:title', (req, res) => {
  const postIndex = POST.findIndex((post)=>post.title === req.params.title);
  const selectedPost = POST[postIndex];
  res.render('board_modify', {selectedPost});
});
// 게시물 수정
router.post('/modify/:title', (req, res)=>{
  if (req.body.title && req.body.content) {
    const postIndex = POST.findIndex((post)=>post.title === req.params.title);

    if (postIndex !== -1) {
      POST[postIndex].title = req.body.title;
      POST[postIndex].content = req.body.content;
      res.redirect('/board')
    } else {
      const err = new Error('해당 제목의 글이 없습니다.');
      err.statusCode = 404;
      throw err;
    }
    
  } else {
    const err = new Error('요청 쿼리 이상');
    err.statusCode = 404;
    throw err;
  }
});

// 글 삭제
router.delete('/delete/:title', (req, res)=> {
  const postIndex = POST.findIndex((post)=>post.title === req.params.title);
  if (postIndex!==-1){
    POST.splice(postIndex,1);
    res.send('게시물 삭제 완료');
  } else {
    const err = new Error('해당 제목을 가진 게시물이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;