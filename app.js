const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  checkUser,
  checkEmail,
  createUser,
  loginUser,
  getHashedPassword,
  generateSession,
  updateSession,
  login,
} = require("./api/db.js");
const { checkToken } = require("./middlewares/checkToken.js");
const { checkLogin } = require("./middlewares/checkLogin.js");
const app = express();
const port = process.env.PORT || 3001;

const jsonParser = bodyParser.json();
app.use(express.static("public"));
app.use(cookieParser());

// Получение постов
app.get("/posts", async (req, res) => {
  let data = await getPosts();
  res.json(data);
});

// Создание поста
app.post("/posts", jsonParser, checkToken, checkLogin, async (req, res) => {
  const { user_id, content } = req.body;
  await createPost(user_id, content);
  return res.status(200).json({ message: "Пост создан!" });
});

// Удаление поста
app.delete(
  "/posts/:id",
  jsonParser,
  checkToken,
  checkLogin,
  async (req, res) => {
    const postId = req.params.id;
    await deletePost(postId);
    return res.status(200).json({ message: "Пост удален!" });
  }
);

// Обновление поста
app.post("/posts/:id", jsonParser, checkToken, checkLogin, async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  await updatePost(postId, content);
  return res.status(200).json({ message: "Пост обновлен!" });
});

// Создание пользователя
app.post("/createUser", jsonParser, async (req, res) => {
  const { nickname, password, email } = req.body;
  const resultEmail = await checkEmail(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const resultNickname = await checkUser(nickname);
  if (resultNickname) {
    res.status(400).json({ message: "Имя пользователя занято" });
  } else if (resultEmail) {
    res.status(400).json({
      message: "На эту почту уже зарегистрирован аккаунт",
    });
  } else {
    await createUser(nickname, hashedPassword, email);
    const token = crypto.randomUUID();
    const dateNow = new Date().toISOString();
    await generateSession(token, nickname, dateNow);
    res
      .status(200)
      .cookie("token", token)
      .json({ message: "Пользователь успешно создан" });
  }
  res.end();
});

// Авторизация пользователя
app.post("/login", jsonParser, async (req, res) => {
  const { nickname, password } = req.body;
  const userPassword = await getHashedPassword(nickname);
  if (!userPassword) {
    return res.status(400).json({ message: "Неверный логин" });
  }
  const match = await bcrypt.compare(password, userPassword);
  if (!match) {
    return res.status(400).json({ message: "Неверный пароль" });
  }
  await loginUser(nickname, userPassword);
  const token = crypto.randomUUID();
  const date = new Date().toISOString();
  await updateSession(token, nickname, date);
  return res
    .status(200)
    .cookie("token", token)
    .json({ message: "Пользователь успешно авторизован" });
});

app.get("/feed.json", jsonParser, checkToken, async (req, res) => {
  const { nickname } = req.body;
  const token = req.cookies.token;
  const loginResult = await login(nickname, token);
  if (!loginResult) {
    return res.status(401).json({ message: "Токена не существует" });
  }
  return res.status(200).json({ message: "Пользователь успешно авторизован" });
});

app.get("/feed", jsonParser, checkToken, async (req, res) => {
  return res
    .status(200)
    .json({ message: "Пользователь на странице с постами" });
});

// Главная страница
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
