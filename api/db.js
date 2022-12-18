const { Client } = require("pg");

const connectionString =
  "postgres://icykit:zC5UPHaENAenLMezWnFfiBkmov9PlKXk@dpg-ce4anoarrk0djk4lds60-a.frankfurt-postgres.render.com/twitter_development";
const makeNewClient = () => {
  return new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

const getPosts = async () => {
  const client = makeNewClient();
  client.connect();
  const res = await client.query(
    "SELECT name, nickname, content, attachment, replies, likes, reposts, avatarphoto, postdate FROM users INNER JOIN posts ON id = user_id ORDER BY postdate DESC"
  );
  client.end();
  return res.rows;
};

const createPost = async (user_id, content) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `INSERT INTO posts (user_id, content) VALUES (${user_id}, '${content}')`;
  await client.query(queryString);
  client.end();
};

const deletePost = async (post_id) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `DELETE FROM posts WHERE post_id = ${post_id}`;
  await client.query(queryString);
  client.end();
};

const updatePost = async (post_id, content) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `UPDATE posts SET content = '${content}' WHERE post_id = ${post_id}`;
  await client.query(queryString);
  client.end();
};

const createUser = async (nickname, password, email) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `INSERT INTO users (nickname, password, name, email) VALUES ('${nickname}', '${password}', '${nickname}', '${email}')`;
  await client.query(queryString);
  client.end();
};

const checkUser = async (nickname) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `SELECT EXISTS (SELECT * FROM users WHERE nickname = '${nickname}')`;
  const result = await client.query(queryString);
  const isUser = result.rows[0].exists;
  client.end();
  return isUser;
};

const checkEmail = async (email) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `SELECT EXISTS (SELECT * FROM users WHERE email = '${email}')`;
  const result = await client.query(queryString);
  const isEmail = result.rows[0].exists;
  client.end();
  return isEmail;
};

const loginUser = async (nicknameOrEmail, password) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `SELECT EXISTS (SELECT * FROM users WHERE (nickname = '${nicknameOrEmail}' OR email = '${nicknameOrEmail}') AND password = '${password}')`;
  const result = await client.query(queryString);
  const isUser = result.rows[0].exists;
  client.end();
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
  const client = makeNewClient();
  client.connect();
  const queryString = `SELECT token FROM sessions AS s INNER JOIN users AS u ON s.user_id = u.id WHERE nickname = '${nickname}' and (created_at BETWEEN '${sevenDaysBefore}' AND '${dateNow}')`;
  const result = await client.query(queryString);
  client.end();
  if (!result.rows[0].token || result.rows[0].token !== token) {
    return false;
  }
  return true;
};

const getHashedPassword = async (nicknameOrEmail) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `SELECT password FROM users WHERE nickname = '${nicknameOrEmail}' OR email = '${nicknameOrEmail}'`;
  const result = await client.query(queryString);
  client.end();
  if (result.rows[0]) {
    return result.rows[0].password;
  } else {
    return false;
  }
};

const generateSession = async (token, nickname, date) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `INSERT INTO sessions (token, user_id, created_at) VALUES ('${token}', (SELECT id FROM users WHERE nickname = '${nickname}'), '${date}')`;
  await client.query(queryString);
  client.end();
};

const updateSession = async (token, nicknameOrEmail, date) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `UPDATE sessions SET token = '${token}', created_at = '${date}' WHERE user_id = (SELECT id FROM users WHERE nickname = '${nicknameOrEmail}' OR email = '${nicknameOrEmail}')`;
  await client.query(queryString);
  client.end();
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
};
