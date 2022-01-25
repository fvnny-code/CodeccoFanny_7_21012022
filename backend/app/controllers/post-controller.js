// Import File System package to manage images downloads and uploads
const fs = require("fs");
const { post } = require("../models");
// Import data abse connection
const db = require("../models");

const Post = db.post;

// Middleware to create a post
exports.createPost = (req, res, next) => {
  const newPost = {
    userId: req.body.userId,
    title: req.body.title,
    message: req.body.message,
    media:
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename,
    createdAt: req.body.createdAt,
  };
  Post.create(newPost)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => res.status(404).send({ error }));
};

// Middleware to get all posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll({ order: [["id", "DESC"]] })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Middleware to get one post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => res.status(404).json({ error }));
};

// Middleware to modify a post
exports.modifyPost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      let img = post.media.split("/images")[1];
      const postObject = {
        title: req.body.title ? req.body.title : post.title,
        message: req.body.message ? req.body.message : post.message,
        media: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : post.media,
      };
      if (req.file) {
        fs.unlink("images/" + img, () => {
          Post.update(
            { ...postObject, id: req.params.id },
            { where: { id: req.params.id } }
          )
            .then(() =>
              res.status(200).json({ message: "Le post a été modifié." })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        Post.update(
          { ...postObject, id: req.params.id },
          { where: { id: req.params.id } }
        )
          .then(() =>
            res.status(200).json({ message: "Le post a été modifié." })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Middleware to delete a post
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      let filename = post.media.split("/images/")[1];
      fs.unlink("images/" + filename, () => {
        Post.deleteOne({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "Le post a été supprimé." })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
