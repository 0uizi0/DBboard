require('./mongooseConnect');
const User = require('../models/user');

const REGISTER_DUPLICATED_MSG = '동일한 ID를 가진 회원이 존재합니다. <br/><a href="/register">회원가입으로 이동</a>';
const REGISTER_SUCCESS_MSG = '회원 가입에 성공하였습니다.<br/><a href="/login">로그인 페이지로 이동</a>';
const REGISTER_UNEXPECTED_MSG = '회원 가입에 실패하였습니다.<br/><a href="/register">회원가입 페이지로 이동</a>';

const LOGIN_UNEXPECTED_MSG = '로그인에 실패하였습니다.<br/><a href="/login">로그인 페이지로 이동</a>';
const LOGIN_NOT_REGISTER_ID = '해당 ID를 가진 회원이 존재하지 않습니다. <br/><a href="/register">회원가입으로 이동</a>';
const LOGIN_WRONG_PASSWORD_MSG = '비밀번호가 다릅니다.<br/><a href="/login">로그인 페이지로 이동</a>';

const registerUser = async (req, res) => {
  try {
    const duplicatedUser = await User.findOne({id: req.body.id});
    if (duplicatedUser) return res.status(400).send(REGISTER_DUPLICATED_MSG);

    await User.create(req.body);
    res.status(200).send(REGISTER_SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(REGISTER_UNEXPECTED_MSG);
  }
}

const loginUser = async (req, res) => {
  try {
    const client  = await mongoClient.connect();
    const user = client.db('mongo').collection('user');
    
    const findUser = await user.findOne({id: req.body.id});
    if (!findUser) return res.status(400).send(LOGIN_NOT_REGISTER_ID);

    if(findUser.password !== req.body.password) return res.status(400).send(LOGIN_WRONG_PASSWORD_MSG);

    req.session.login = true;
    req.session.userId = req.body.id;
    
    // 로그인 쿠키 발행
    res.cookie('user',req.body.id, {
      maxAge: 1000 * 10,
      httpOnly: true,
      signed: true,
    });
    res.status(200);
    res.redirect('/board');
  } catch (err) {
    console.error(err);
    res.status(500).send(LOGIN_UNEXPECTED_MSG);
  }
};

// const userDB = {
//   userCheck: async (userId) => {
//     const client  = await mongoClient.connect();
//     const user = client.db('mongo').collection('user');

//     const findUser  = await user.findOne({id: userId});
//     if (!findUser) return false;
//     return findUser;
//   },
  // registerUser: async (newUser) => {
  //   const client  = await mongoClient.connect();
  //   const user = client.db('mongo').collection('user');

  //   const insertResult = await user.insertOne(newUser);
  //   if (!insertResult.acknowledged) throw new Error('회원 등록 실패');
  //   return true;
  // }
// }

// const userDB = {
//   getUsers: (cb) => {
//     connection.query('SELECT * FROM board_db.user;', (err,data) => {
//       if (err) throw err;
//       console.log(data);
//       cb(data);
//     });
//   },
//   userCheck: (userId, cb) => {
//     connection.query(`SELECT * FROM board_db.user WHERE USERID = '${userId}';`, (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       cb(data);
//     })
//   },
//   registerUser: (newUser, cb) => {
//     connection.query(`INSERT INTO board_db.user (USERID, PASSWORD) values ('${newUser.id}', '${newUser.password}');`, (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       cb(data);
//     })
//   }
// };

module.exports = {
  registerUser,
  loginUser,
};