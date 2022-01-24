var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments-model");
var _users = require("./users-model");
var _posts = require("./posts-model");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);

  comments.belongsTo(posts, { as: "post", foreignKey: "postId" });
  posts.hasMany(comments, { as: "comments", foreignKey: "postId" });
  comments.belongsTo(users, { as: "user", foreignKey: "userId" });
  users.hasMany(comments, { as: "comments", foreignKey: "userId" });
  posts.belongsTo(users, { as: "user", foreignKey: "userId" });
  users.hasMany(posts, { as: "posts", foreignKey: "userId" });
  return {
    comments,
    users,
    posts,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
