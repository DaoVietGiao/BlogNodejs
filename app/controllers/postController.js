const Post = require('../models/postModel');

exports.getAllPosts = (req, res) => {
    Post.getAll((err, posts) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(posts);
    });
};
