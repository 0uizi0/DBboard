const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

const mainRouter = require('./routes');

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버 실행 중`);
});