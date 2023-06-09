const { ObjectId } = require('mongodb');

const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG = '<br><a href="/">메인 페이지로 이동</a>'

const getAllPosts = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('mongo').collection('board');
    
    const allPostCursor = board.find({});
    const POST = await allPostCursor.toArray();
    res.render('board', {
      POST,
      postCnts: POST.length,
      userId: req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message, UNEXPECTED_MSG);
  }
};

const writePost = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('mongo').collection('board');

    const newPost = {
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
      IMAGE: req.file ? req.file.filename : null,
    };
    await board.insertOne(newPost);
    res.redirect('/board');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message, UNEXPECTED_MSG);
  }
};

const getPost = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('mongo').collection('board');

    const selectedPost = await board.findOne({
      _id: ObjectId(req.params.id),
    });
    res.render('board_modify', {selectedPost});
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message, UNEXPECTED_MSG);
  }
}

const modifyPost = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('mongo').collection('board');

    const modify = {
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    if (req.file) modify.IMAGE = req.file.filename;

    await board.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: modify }
    );

    res.redirect('/board');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message, UNEXPECTED_MSG);
  }
};

const deletePost = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('mongo').collection('board');

    await board.deleteOne({_id: ObjectId(req.params.id)});
    res.status(200).json('삭제 성공');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message, UNEXPECTED_MSG);
  }
}

module.exports = {
  getAllPosts,
  writePost,
  getPost,
  modifyPost,
  deletePost,
}