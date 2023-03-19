const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('주소 요청 응답 성공')
})

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버 실행 중`);
});