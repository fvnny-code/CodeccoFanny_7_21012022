//Import sequelize
const Sequelize = require ('sequelize');

const sequelize = new Sequelize ( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    define: {
        timestamps: false
    },

});
const db= {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users.js")(sequelize, Sequelize);
db.post = require("./posts.js")(sequelize, Sequelize);
db.comment = require('./comments.js')(sequelize, Sequelize);

module.exports = db;