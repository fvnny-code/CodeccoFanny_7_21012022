// Import of jsonWebToken package
const jwt = require("jsonwebtoken");

// Routes control : checks the user's TOKEN. If it matches the userID in the request, changing the corresponding data will be allowed
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("Votre requête est invalide") });
  }
};
