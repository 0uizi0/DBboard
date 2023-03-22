const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser('0l0jjo'));

app.use(
  session({
    secret: '0l0jjo',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
)

const mainRouter = require('./routes');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const dbUserRouter = require('./routes/dbUser');
const cookieRouter = require('./routes/cookie');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/board', boardRouter);
app.use('/dbUser', dbUserRouter);
app.use('/cookie', cookieRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버 실행 중`);
});