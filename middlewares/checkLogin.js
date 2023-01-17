const { login } = require("../api/db.js");

const checkLogin = async (req, res, next) => {
  const { nickname } = req.body;
  const token = req.cookies.token;
  const loginResult = await login(nickname, token);
  if (!loginResult) {
    console.log("Токена не существует");
    return res.status(401).json({ message: "Токена не существует" });
  }
  next();
};

module.exports = {
  checkLogin,
};
