const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("Доступ запрещен");
    return res.status(400).json({ message: "Доступ запрещен" });
  }
  console.log("Доступ разрешен");
  next();
};

module.exports = {
  checkToken,
};
