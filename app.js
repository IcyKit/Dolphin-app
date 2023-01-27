const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
  getUserID,
  getUserByToken,
  updateUserInfo,
  client,
  updateUserAvatar,
  checkUserNickname,
  updatePassword,
  updateUserInfoWithoutNickname,
  getUserData,
  getPostsById,
  followUser,
  unfollowUser,
  getPostsByFollowed,
} = require('./api/db.js');
const { checkToken } = require('./middlewares/checkToken.js');
const { checkLogin } = require('./middlewares/checkLogin.js');
const app = express();
const port = process.env.PORT || 3001;

const jsonParser = bodyParser.json();
app.use(cors());
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(cookieParser());

// Получение информации о пользователе
app.get('/me', async (req, res) => {
  const token = req.cookies.token;
  const userData = await getUserByToken(token);
  res.json(userData);
});

// Обновление пользователя
app.post('/me', jsonParser, async (req, res) => {
  const token = req.cookies.token;
  const userData = req.body;
  let response;
  if (userData.nickname) {
    const checkNickname = await checkUserNickname(userData.nickname);
    if (checkNickname) {
      return res.json({
        message: 'Пользователь с таким никнеймом уже существует',
        status: 'nicknameError',
      });
    }
    response = await updateUserInfo(token, userData);
  } else {
    response = await updateUserInfoWithoutNickname(token, userData);
  }
  if (!response) {
    return res.json({ message: 'Ошибка обновления профиля', status: 'error' });
  }
  return res.json({ message: 'Профиль успешно обновлен', status: 'success' });
});

app.get('/user/:id', jsonParser, async (req, res) => {
  const { id } = req.params;
  const userData = await getUserData(id);
  res.json(userData);
});

app.post('/me/avatar', jsonParser, async (req, res) => {
  const token = req.cookies.token;
  const { url } = req.body;
  const response = await updateUserAvatar(token, url);
  if (!response) {
    res.json({ message: 'Ошибка обновления аватара', status: 'error' });
  }
  res.json({ message: 'Аватар успешно обновлен', status: 'success' });
});

app.post('/me/password', jsonParser, async (req, res) => {
  const token = req.cookies.token;
  const { newPassword, oldPassword } = req.body;
  const oldPasswordHashed = await getHashedPassword(token);
  const comparedPasswords = await bcrypt.compare(
    oldPassword,
    oldPasswordHashed
  );
  if (!comparedPasswords) {
    return res.json({
      message: 'Текущий пароль неверный',
      status: 'oldPasswordError',
    });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updatePassword(token, hashedPassword);
  return res.json({ message: 'Пароль успешно изменен', status: 'success' });
});

// Получение постов
app.get('/posts', async (req, res) => {
  const data = await getPosts();
  res.json(data);
});

app.post('/posts/followed', jsonParser, async (req, res) => {
  const { followingId, id } = req.body;
  const data = await getPostsByFollowed(followingId, id);
  res.json(data);
});

app.get('/posts/:id', jsonParser, async (req, res) => {
  const { id } = req.params;
  const data = await getPostsById(Number(id));
  res.json(data);
});

app.post('/follow', jsonParser, async (req, res) => {
  const { id, user_id } = req.body;
  await followUser(id, user_id);
  res.json({ message: 'Followed' });
});

app.post('/unfollow', jsonParser, async (req, res) => {
  const { id, user_id } = req.body;
  await unfollowUser(id, user_id);
  res.json({ message: 'Unfollowed' });
});

// Создание поста
app.post('/posts', jsonParser, async (req, res) => {
  const { content, attachment } = req.body;
  const token = req.cookies.token;
  const user_id = await getUserID(token);
  if (!user_id) {
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }
  const date = new Date().toISOString();
  await createPost(user_id, content, attachment, date);
  return res.status(200).json({ message: 'Пост создан!' });
});

// Удаление поста
app.delete(
  '/posts/:id',
  jsonParser,
  checkToken,
  checkLogin,
  async (req, res) => {
    const postId = req.params.id;
    await deletePost(postId);
    return res.status(200).json({ message: 'Пост удален!' });
  }
);

// Обновление поста
app.post('/posts/:id', jsonParser, checkToken, checkLogin, async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  await updatePost(postId, content);
  return res.status(200).json({ message: 'Пост обновлен!' });
});

// Создание пользователя
app.post('/createUser', jsonParser, async (req, res) => {
  const { nickname, password, email } = req.body;
  const resultEmail = await checkEmail(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const resultNickname = await checkUser(nickname);
  if (resultNickname) {
    res.status(400).json({ message: 'Имя пользователя занято' });
  } else if (resultEmail) {
    res.status(400).json({
      message: 'На эту почту уже зарегистрирован аккаунт',
    });
  } else {
    await createUser(nickname, hashedPassword, email);
    const token = crypto.randomUUID();
    const dateNow = new Date().toISOString();
    await generateSession(token, nickname, dateNow);
    res
      .status(200)
      .cookie('token', token)
      .json({ message: 'Пользователь успешно создан' });
  }
  res.end();
});

// Авторизация пользователя
app.post('/login', jsonParser, async (req, res) => {
  const { nickname, password } = req.body;
  const userPassword = await getHashedPassword(nickname);
  if (!userPassword) {
    return res.status(400).json({ message: 'Неверный логин' });
  }
  const match = await bcrypt.compare(password, userPassword);
  if (!match) {
    return res.status(400).json({ message: 'Неверный пароль' });
  }
  await loginUser(nickname, userPassword);
  const token = crypto.randomUUID();
  const date = new Date().toISOString();
  await updateSession(token, nickname, date);
  return res
    .status(200)
    .cookie('token', token)
    .json({ message: 'Пользователь успешно авторизован' });
});

app.get('/feed.json', jsonParser, checkToken, async (req, res) => {
  const { nickname } = req.body;
  const token = req.cookies.token;
  const loginResult = await login(nickname, token);
  if (!loginResult) {
    return res.status(401).json({ message: 'Токена не существует' });
  }
  return res.status(200).json({ message: 'Пользователь успешно авторизован' });
});

// Главная страница
app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/app', checkToken, async (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
  client.connect();
});
