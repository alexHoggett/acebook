const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    console.log(req.user_id);
    const post = new Post({
      content: req.body.content,
      likes: 0,
      user_id: req.user_id,
      date_created: new Date()
    });
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  Delete: async (req, res) => {
    const postId = req.params.id;
    try {
      await Post.deleteOne({ _id: postId });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res
        .status(200)
        .json({ message: 'Post deleted successfully', token: token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  };

module.exports = PostsController;
