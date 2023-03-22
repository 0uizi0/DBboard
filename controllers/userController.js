const MongoClient = require('./mongoConnect');

const userDB = {
  userCheck: async (userId) => {
    const client  = await MongoClient.connect();
    const user = client.db('mongo').collection('user');

    const findUser  = await user.findOne({id: userId});
    if (!findUser) return false;
    return findUser;
  },
  registerUser: async (newUser) => {
    const client  = await MongoClient.connect();
    const user = client.db('mongo').collection('user');

    const insertResult = await user.insertOne(newUser);
    if (!insertResult.acknowledged) throw new Error('회원 등록 실패');
    return true;
  }
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

module.exports = userDB;