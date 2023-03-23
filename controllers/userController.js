const MongoClient = require('./mongoConnect');

const REGISTER_DUPLICATED_MSG = '동일한 ID를 가진 회원이 존재합니다. <br/><a href="/register">회원가입으로 이동</a>';
const REGISTER_SUCCESS_MSG = '회원 가입에 성공하였습니다.<br/><a href="/login">로그인 페이지로 이동</a>';
const REGISTER_UNEXPECTED_MSG = '회원 가입에 실패하였습니다.<br/><a href="/register">회원가입 페이지로 이동</a>';

const registerUser = async (req, res) => {
  try {
    const client  = await MongoClient.connect();
    const user = client.db('mongo').collection('user');

    const duplicatedUser = await user.findOne({id: req.body.id});
    if (duplicatedUser) return res.status(400).send(REGISTER_DUPLICATED_MSG);

    await user.insertOne(req.body);
    res.status(200).send(REGISTER_SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(REGISTER_UNEXPECTED_MSG);
  }
}

const userDB = {
  userCheck: async (userId) => {
    const client  = await MongoClient.connect();
    const user = client.db('mongo').collection('user');

    const findUser  = await user.findOne({id: userId});
    if (!findUser) return false;
    return findUser;
  },
  // registerUser: async (newUser) => {
  //   const client  = await MongoClient.connect();
  //   const user = client.db('mongo').collection('user');

  //   const insertResult = await user.insertOne(newUser);
  //   if (!insertResult.acknowledged) throw new Error('회원 등록 실패');
  //   return true;
  // }
}

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
};