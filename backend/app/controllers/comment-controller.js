// Import database connexion
const { restart } = require("nodemon");
const db = require("../models");

const Comment = db.comment;

// Middleware to create a comment
exports.createComment = (req, ers, next) => {
  const newComment = {
    comment: req.body.comment,
    postId: req.body.postId,
    userId: req.body.userId,
    createdAt: req.body.createdAt,
  };
  Comment.create(newComment)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(404).send({ error });
    });
};

// Middleware to modifiy a comment
exports.modifyComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then(() => {
      res.status(201).json({ message: "le commentaire a été modifié." });
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

// Middelware to delete a comment
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.paramams.id } }, (err, data) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Le commentaire n'a pas pu être supprimé." });
    }
    res.status(200).json({ message: "Le commentaire a été supprimé." });
  });
};
// Middleware to get all comments
exports.getAllComments = (req, res, next) => {
  Comment.findAll({ where: { postId: req.params.id }, order: [["id", "DESC"]] })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
