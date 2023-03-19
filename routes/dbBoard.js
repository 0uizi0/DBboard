const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

router.get('/getAll', (req, res) => {
  boardDB.getAllArticles((data)=>{
    res.send(data);
  });
});

module.exports = router;