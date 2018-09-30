const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://sonal:yymI5Mhr9ECXRWrM@cluster0-opklo.mongodb.net/node-angular?retryWrites=true")
.then(() => {
  console.log("connected to db");
})
.catch(() => {
  console.log("connection failed");
});

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts' ,(req,res,next) =>
{
  //const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts',(req,res,next) => {
  Post.find().then(documents => {
    res.status(200).json(
      {
        message: "Posts fetched successfully",
        posts: documents
      }

    );
  });
});

app.delete("/api/posts/:id" , (req,res,next) => {
  console.log(req.params.id);
  res.status(200).json({message: 'Post deleted'});
});

module.exports = app;
