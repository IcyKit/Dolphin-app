const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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
const { log } = require("console");

const app = express();
const port = process.env.PORT || 3001;

const jsonParser = bodyParser.json();
app.use(express.static("public"));

// Получение постов
app.get("/posts", async (req, res) => {
  let data = await getPosts();
  res.json(data);
});

// Создание поста
app.post("/posts", jsonParser, async (req, res) => {
  const { user_id, content } = req.body;
  await createPost(user_id, content);
  res.send("Пост добавлен");
});

// Удаление поста
app.delete("/posts/:id", jsonParser, async (req, res) => {
  const postId = req.params.id;
  await deletePost(postId);
  res.send("Пост удален!");
});

// Обновление поста
app.post("/posts/:id", jsonParser, async (req, res) => {
  const postId = req.params.id;
  const { content } = await req.body;
  await updatePost(postId, content);
  res.send("Пост обновлен!");
});

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
});

app.post("/login", jsonParser, async (req, res) => {
  const { nickname, password } = req.body;
  const userPassword = await getHashedPassword(nickname);
  if (!userPassword) {
    res.status(400).json({ message: "Неверный логин" });
    return;
  }
  const match = await bcrypt.compare(password, userPassword);
  if (!match) {
    res.status(400).json({ message: "Неверный пароль" });
    return;
  }
  await loginUser(nickname, userPassword);
  const token = crypto.randomUUID();
  const date = new Date().toISOString();
  await updateSession(token, nickname, date);
  res
    .status(200)
    .cookie("token", token)
    .json({ message: "Пользователь успешно авторизован" });
});

app.get("/feed.json", jsonParser, async (req, res) => {
  const { nickname, token } = req.body;
  const loginResult = await login(nickname, token);
  if (loginResult) {
    res.status(200).json({ message: "Пользователь успешно авторизован" });
  } else {
    res.status(401).json({ message: "Токена не существует" });
  }
  res.end();
});

// Главная страница
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
