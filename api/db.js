const { Client } = require('pg');

/*
ЗАПРОС НА ТЕХ, НА КОГО Я ПОДПИСАН

SELECT *
FROM followers_and_following
INNER JOIN users on
following_id = id
WHERE user_id = 23
*/

/*
ЗАПРОС НА ТЕХ, КТО ПОДПИСАН НА МЕНЯ

SELECT *
FROM followers_and_following
INNER JOIN users on
user_id = id
WHERE following_id = 23
*/

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
    `SELECT user_id, name, nickname, content, attachment, replies, likes, reposts, avatarphoto, postdate FROM users INNER JOIN posts ON id = user_id ORDER BY postdate DESC`
  );
  return res.rows;
};

const getPostsByFollowed = async (following_id, id) => {
  const res = await client.query(
    `SELECT user_id, name, nickname, content, attachment, replies, likes, reposts, avatarphoto, postdate FROM users INNER JOIN posts ON id = user_id WHERE user_id IN (${following_id}) OR user_id = ${id} ORDER BY postdate DESC`
  );
  return res.rows;
};

const getPostsById = async (id) => {
  const res = await client.query(
    `SELECT user_id, name, nickname, content, attachment, replies, likes, reposts, avatarphoto, postdate FROM users INNER JOIN posts ON id = user_id WHERE id = ${id} ORDER BY postdate DESC`
  );
  if (!res.rows) {
    return [];
  }
  return res.rows;
};

const getUserData = async (id) => {
  const queryString = `SELECT * FROM users WHERE id = ${id}`;
  const userData = await client.query(queryString);
  if (!userData.rows[0]) {
    console.log('Ошибка получения');
    return res.json({
      message: 'Ошибка получения пользователя',
      status: 'error',
    });
  }
  return userData.rows[0];
};

const createPost = async (user_id, content, attachment, date) => {
  const queryString = `
  INSERT INTO posts (user_id, content, postdate, attachment) VALUES (${user_id}, '${content}', '${date}', '${attachment}');
  UPDATE users SET totalmessages = totalmessages + 1 WHERE id = ${user_id};`;
  await client.query(queryString);
};

const getUserID = async (token) => {
  const queryString = `SELECT user_id FROM sessions WHERE token = '${token}'`;
  const user_id = await client.query(queryString);
  if (!user_id.rows[0]) {
    return false;
  }
  return user_id.rows[0].user_id;
};

const checkUserNickname = async (nickname) => {
  const queryString = `SELECT EXISTS (SELECT * FROM users WHERE nickname = '${nickname}')`;
  const response = await client.query(queryString);
  return response.rows[0].exists;
};

const updateUserInfo = async (token, userData) => {
  const queryString = `UPDATE users SET name = '${userData.name}', nickname = '${userData.nickname}', description = '${userData.description}', location = '${userData.location}', website = '${userData.website}', birthday = '${userData.birthday}' WHERE id = (SELECT user_id FROM sessions WHERE token = '${token}')`;
  const response = await client.query(queryString);
  if (!response.rowCount) {
    return false;
  }
  return true;
};

const updateUserInfoWithoutNickname = async (token, userData) => {
  const queryString = `UPDATE users SET name = '${userData.name}', description = '${userData.description}', location = '${userData.location}', website = '${userData.website}', birthday = '${userData.birthday}' WHERE id = (SELECT user_id FROM sessions WHERE token = '${token}')`;
  const response = await client.query(queryString);
  if (!response.rowCount) {
    return false;
  }
  return true;
};

const updateUserAvatar = async (token, url) => {
  const queryString = `UPDATE users SET avatarphoto = '${url}' WHERE id = (SELECT user_id FROM sessions WHERE token = '${token}')`;
  const response = await client.query(queryString);
  return response;
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
  const queryString = `INSERT INTO users (nickname, password, name, email, avatarphoto) VALUES ('${nickname}', '${password}', '${nickname}', '${email}', '/default-avatar.png')`;
  await client.query(queryString);
};

const updatePassword = async (token, password) => {
  const queryString = `UPDATE users SET password = '${password}' WHERE id = (SELECT user_id FROM sessions WHERE token = '${token}')`;
  const result = await client.query(queryString);
  if (!result) {
    return false;
  }
  return true;
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

const getHashedPassword = async (value) => {
  const queryString = `SELECT password FROM users WHERE nickname = '${value}' OR email = '${value}' or id = (SELECT user_id FROM sessions WHERE token = '${value}')`;
  const result = await client.query(queryString);
  if (result.rows[0]) {
    return result.rows[0].password;
  } else {
    return false;
  }
};

const followUser = async (id, following_id) => {
  const queryString = `INSERT INTO followers_and_following (user_id, following_id) VALUES (${id}, ${following_id})`;
  await client.query(queryString);
};

const unfollowUser = async (id, following_id) => {
  const queryString = `DELETE FROM followers_and_following WHERE user_id = ${id} AND following_id = ${following_id}`;
  await client.query(queryString);
};

const generateSession = async (token, nickname, date) => {
  const queryString = `INSERT INTO sessions (token, user_id, created_at) VALUES ('${token}', (SELECT id FROM users WHERE nickname = '${nickname}'), '${date}')`;
  await client.query(queryString);
};

const updateSession = async (token, nicknameOrEmail, date) => {
  const queryString = `UPDATE sessions SET token = '${token}', created_at = '${date}' WHERE user_id = (SELECT id FROM users WHERE nickname = '${nicknameOrEmail}' OR email = '${nicknameOrEmail}')`;
  await client.query(queryString);
};

const getUserByToken = async (token) => {
  const user_id = await getUserID(token);
  const userDataQueryString = `SELECT * FROM users WHERE id = ${user_id}`;
  const userData = await client.query(userDataQueryString);
  const followingQueryString = `SELECT *
  FROM followers_and_following
  INNER JOIN users on
  following_id = id
  WHERE user_id = ${user_id}`;
  const followingData = await client.query(followingQueryString);
  const followersQueryString = `SELECT *
  FROM followers_and_following
  INNER JOIN users on
  user_id = id
  WHERE following_id = ${user_id}`;
  const followersData = await client.query(followersQueryString);
  const finalObj = {
    ...userData.rows[0],
    following: followingData.rows,
    followers: followersData.rows,
  };
  return finalObj;
};

const getFollowing = async (token) => {
  const queryString = ``;
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
  updateUserAvatar,
  checkUserNickname,
  updatePassword,
  updateUserInfoWithoutNickname,
  getUserData,
  getPostsById,
  followUser,
  unfollowUser,
  getPostsByFollowed,
};
