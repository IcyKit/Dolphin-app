const { Client } = require('pg');

const connectionString =
  'postgres://icykit:zC5UPHaENAenLMezWnFfiBkmov9PlKXk@dpg-ce4anoarrk0djk4lds60-a.frankfurt-postgres.render.com/twitter_development';
const makeNewClient = () => {
  return new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

const client = makeNewClient();

const getPosts = async () => {
  const res = await client.query(
    'SELECT name, nickname, content, attachment, replies, likes, reposts, avatarphoto, postdate FROM users INNER JOIN posts ON id = user_id ORDER BY postdate DESC'
  );
  return res.rows;
};

const createPost = async (user_id, content, attachment, date) => {
  const queryString = `INSERT INTO posts (user_id, content, postdate, attachment) VALUES (${user_id}, '${content}', '${date}', '${attachment}')`;
  await client.query(queryString);
};

const getUserID = async (token) => {
  const queryString = `SELECT user_id FROM sessions WHERE token = '${token}'`;
  const user_id = await client.query(queryString);
  if (!user_id.rows[0]) {
    console.log('Юзера нет');
    return false;
  }
  return user_id.rows[0].user_id;
};

const updateUserInfo = async (token, userData) => {
  const queryString = `UPDATE users SET name = '${userData.name}', nickname = '${userData.name}', description = '${userData.description}', location = '${userData.location}', website = '${userData.website}', birthday = ${userData.birthday} WHERE id = (SELECT user_id FROM sessions WHERE token = '${token}')`;
  await client.query(queryString);
};

const deletePost = async (post_id) => {
  const queryString = `DELETE FROM posts WHERE post_id = ${post_id}`;
  await client.query(queryString);
};

const updatePost = async (post_id, content) => {
  const queryString = `UPDATE posts SET content = '${content}' WHERE post_id = ${post_id}`;
  await client.query(queryString);
};

const createUser = async (nickname, password, email) => {
  const queryString = `INSERT INTO users (nickname, password, name, email) VALUES ('${nickname}', '${password}', '${nickname}', '${email}')`;
  await client.query(queryString);
};

const checkUser = async (nickname) => {
  const queryString = `SELECT EXISTS (SELECT * FROM users WHERE nickname = '${nickname}')`;
  const result = await client.query(queryString);
  const isUser = result.rows[0].exists;
  return isUser;
};

const checkEmail = async (email) => {
  const queryString = `SELECT EXISTS (SELECT * FROM users WHERE email = '${email}')`;
  const result = await client.query(queryString);
  const isEmail = result.rows[0].exists;
  return isEmail;
};

const loginUser = async (nicknameOrEmail, password) => {
  const queryString = `SELECT EXISTS (SELECT * FROM users WHERE (nickname = '${nicknameOrEmail}' OR email = '${nicknameOrEmail}') AND password = '${password}')`;
  const result = await client.query(queryString);
  const isUser = result.rows[0].exists;
  return isUser;
};

const login = async (nickname, token) => {
  let dateNow = new Date();
  let sevenDaysBefore = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    dateNow.getDate() - 7,
    dateNow.getHours(),
    dateNow.getMinutes()
  );
  dateNow = dateNow.toISOString();
  sevenDaysBefore = sevenDaysBefore.toISOString();
  const queryString = `SELECT token FROM sessions AS s INNER JOIN users AS u ON s.user_id = u.id WHERE nickname = '${nickname}' AND token = '${token}' AND (created_at BETWEEN '${sevenDaysBefore}' AND '${dateNow}')`;
  const result = await client.query(queryString);
  if (!result.rows[0] || result.rows[0].token !== token) {
    return false;
  }
  return true;
};

const getHashedPassword = async (nicknameOrEmail) => {
  const queryString = `SELECT password FROM users WHERE nickname = '${nicknameOrEmail}' OR email = '${nicknameOrEmail}'`;
  const result = await client.query(queryString);
  if (result.rows[0]) {
    return result.rows[0].password;
  } else {
    return false;
  }
};

const generateSession = async (token, nickname, date) => {
  const queryString = `INSERT INTO sessions (token, user_id, created_at) VALUES ('${token}', (SELECT id FROM users WHERE nickname = '${nickname}'), '${date}')`;
  await client.query(queryString);
};

const updateSession = async (token, nicknameOrEmail, date) => {
  const queryString = `UPDATE sessions SET token = '${token}', created_at = '${date}' WHERE user_id = (SELECT id FROM users WHERE nickname = '${nicknameOrEmail}' OR email = '${nicknameOrEmail}')`;
  await client.query(queryString);
  // client.end();
};

const getUserByToken = async (token) => {
  const queryString = `SELECT * FROM users WHERE id = (SELECT user_id FROM sessions WHERE token = '${token}')`;
  const userData = await client.query(queryString);
  return userData.rows[0];
};

module.exports = {
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
};
