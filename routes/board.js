const express = require('express');

const router = express.Router();

const ARTICLE = [
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
  const articleCnts = ARTICLE.length;
  res.render('board', {ARTICLE, articleCnts});
});

// 글쓰기
// 글쓰기 모드로 이동
router.get('/write', (req, res) => {});
// 게시물 추가
router.post('/write', (req, res) => {});

// 글 수정
// 글 수정 모드로 이동
router.get('/modify/:title', (req, res) => {});
// 게시물 수정
router.post('/modify/:title', (req, res)=>{});

// 글 삭제
router.delete('/delete/:title', (req, res)=> {});

module.exports = router;