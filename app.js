const express = require("express");

const { Client } = require("pg");

const dbTest = async () => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "DrRespect228",
    database: "twitter_development",
  });
  await client.connect();

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
