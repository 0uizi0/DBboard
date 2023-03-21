const connection = require('./dbConnect');

const userDB = {
  getUsers: (cb) => {
    connection.query('SELECT * FROM board_db.user;', (err,data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  },
  userCheck: (userId, cb) => {
    connection.query(`SELECT * FROM board_db.user WHERE USERID = '${userId}';`, (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    })
  },
  registerUser: (newUser, cb) => {
    connection.query(`INSERT INTO board_db.user (USERID, PASSWORD) values ('${newUser.id}', '${newUser.password}');`, (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    })
  }
};

module.exports = userDB;