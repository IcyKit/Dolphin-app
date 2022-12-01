const express = require("express");

const { Client } = require("pg");

const dbTest = async () => {
  const client = new Client({
    host: "dpg-ce4anoarrk0djk4lds60-a",
    port: 5432,
    user: "icykit",
    password: "zC5UPHaENAenLMezWnFfiBkmov9PlKXk",
    database: "twitter_development",
  });
  await client.connect();

  const makeTest = await client.query(`CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	nickname VARCHAR(255) NOT NULL,
	description VARCHAR(255),
	email varchar(255),
	totalMessages int,
	totalFollowers int,
	totalFollowing int,
	avatarPhoto varchar(255),
	headerPhoto varchar(255),
	location varchar(255),
	website varchar(255),
	birthday date
);`);
  const addInfo = await client.query(`
INSERT INTO users (name, nickname, description, email)
VALUES 
('Nikita', 'icykit', 'Fullstack Developer', 'icykitdesign@gmail.com'),
('Ivan', 'itoldstopthecar', 'Car lover', 'itold@gmail.com');
  `);
  const res = await client.query(`SELECT * FROM users`);
  await client.end();
  return res.rows;
};

const app = express();
const port = process.env.PORT || 3001;

app.get("/", async (req, res) => {
  let data = await dbTest();
  res.json(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
