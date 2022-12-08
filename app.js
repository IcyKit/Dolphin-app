const express = require("express");
const bodyParser = require("body-parser");
const url = require("url");
const { getPosts, createPost, deletePost, updatePost } = require("./api/db.js");

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

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
