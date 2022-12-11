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
  // console.log(user_id, content);
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

const loginUser = async (nicknameOrPassword, password) => {
  const client = makeNewClient();
  client.connect();
  const queryString = `SELECT EXISTS (SELECT * FROM users WHERE (nickname = '${nicknameOrPassword}' OR email = '${nicknameOrPassword}') AND password = '${password}')`;
  console.log(queryString);
  const result = await client.query(queryString);
  const isUser = result.rows[0].exists;
  client.end();
  return isUser;
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  checkUser,
  createUser,
  loginUser,
};
