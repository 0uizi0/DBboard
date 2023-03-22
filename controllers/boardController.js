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
    connection.query(`INSERT INTO board_db.board (USERID, TITLE, CONTENT) VALUES ('${newPost.id}','${newPost.title}', '${newPost.content}')`, (err, data) => {
      if (err) throw err;
      cb(data);
    })
  },
  getPost: (id, cb) => {
    connection.query(`SELECT * FROM board_db.board WHERE ID_PK= ${id}`, (err, data) => {
      if (err) throw err;
      cb(data);
    })
  },
  modifyPost: (id, modifyPost, cb) => {
    connection.query(`UPDATE board_db.board SET TITLE = '${modifyPost.title}', CONTENT = '${modifyPost.content}' WHERE ID_PK = ${id};`, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  deletePost: (id, cb) => {
    connection.query(`DELETE FROM board_db.board WHERE ID_PK  = ${id};`, (err, data) => {
      if (err) throw err;
      cb(data);
    })
  }
};

module.exports = boardDB;