const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if ((err, !user))
        return res.status(403).json({
          msg: "Token not valid",
        });

      req.user = user;
      next();
    });
  } else {
    return res.status(403).json({
      msg: "you are not authenticated",
    });
  }
};
