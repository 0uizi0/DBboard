const connection = require('./dbConnect');

const boardDB = {
  getAllArticles: (cb) => {
    connection.query('SELECT * FROM board_db.board;', (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  },
  writePost: (newPost, cb) => {
    connection.query(`INSERT INTO board_db.board (TITLE, CONTENT) VALUES ('${newPost.title}', '${newPost.content}')`, (err, data) => {
      if (err) throw err;
      cb(data);
    })
  },
  getPost: (id, cb) => {
    connection.query(`SELECT * FROM board_db.board WHERE ID_PK= ${id}`, (err, data) => {
      if (err) throw err;
      cb(data);
    })
  }
};

module.exports = boardDB;