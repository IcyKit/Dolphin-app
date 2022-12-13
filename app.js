const express = require("express");
const bodyParser = require("body-parser");
const url = require("url");
const bcrypt = require("bcrypt");

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
} = require("./api/db.js");

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
  const urlArr = url.parse(req.url, true).path.split("/");
  const postId = urlArr.at(-1);
  await deletePost(postId);
  res.send("Пост удален!");
});

// Обновление поста
app.post("/posts/:id", jsonParser, async (req, res) => {
  const urlArr = url.parse(req.url, true).path.split("/");
  const postId = urlArr.at(-1);
  const { content } = await req.body;
  await updatePost(postId, content);
  res.send("Пост обновлен!");
});

app.post("/createUser", jsonParser, async (req, res) => {
  const { nickname, password, email } = req.body;
  const resultNickname = await checkUser(nickname);
  const resultEmail = await checkEmail(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  if (resultNickname) {
    res
      .status(400)
      .json({ message: "Имя пользователя занято", class: "auth-error" });
  } else if (resultEmail) {
    res.status(400).json({
      message: "На эту почту уже зарегистрирован аккаунт",
      class: "auth-error",
    });
  } else {
    await createUser(nickname, hashedPassword, email);
    res
      .status(200)
      .json({ message: "Пользователь успешно создан", class: "auth-success" });
  }
});

app.post("/login", jsonParser, async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const userPassword = await getHashedPassword(nickname);
    const match = await bcrypt.compare(password, userPassword);
    if (match) {
      const result = await loginUser(nickname, userPassword);
      if (result) {
        res.status(200).json({
          message: "Пользователь успешно авторизован",
          class: "auth-success",
        });
      }
    } else {
      res.status(400).json({ message: "Неверный пароль", class: "auth-error" });
    }
  } catch (e) {
    res.status(400).json({ message: "Неверный логин", class: "auth-error" });
  }
});
// Главная страница
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
