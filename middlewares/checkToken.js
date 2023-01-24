const { getUserByToken } = require('../api/db.js');

const checkToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: 'Доступ запрещен' });
  }
  const checkUser = await getUserByToken(token);
  if (!checkUser) {
    return res.json({ message: 'Доступ запрещен' });
  }
  next();
};

module.exports = {
  checkToken,
};
