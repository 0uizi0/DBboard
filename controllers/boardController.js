const connection = require('./dbConnect');

const boardDB = {
  getAllArticles: (cb) => {
    connection.query('SELECT * FROM board_db.board;', (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  }
};

module.exports = boardDB;