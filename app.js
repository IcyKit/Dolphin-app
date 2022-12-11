const express = require("express");
const bodyParser = require("body-parser");
const url = require("url");
const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  checkUser,
  createUser,
  loginUser,
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
  const { user_id, content } = await req.body;
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
  const { nickname, password, email } = await req.body;
  const result = await checkUser(nickname);
  if (result) {
    res.status(400).send("Такой пользователь уже существует");
  } else {
    await createUser(nickname, password, email);
    res.status(200).send("Пользователь успешно создан");
  }
});

app.post("/login", jsonParser, async (req, res) => {
  const { nickname, password } = await req.body;
  const result = await loginUser(nickname, password);
  if (result) {
    res.status(200).send("Пользователь успешно авторизирован");
  } else {
    res.status(400).send("Пользователь не найден");
  }
});

// Главная страница
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
