const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

const mainRouter = require('./routes');
const userRouter = require('./routes/users');

app.use('/', mainRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버 실행 중`);
});