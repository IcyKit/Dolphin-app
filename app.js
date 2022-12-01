const express = require("express");

const { Client, Pool } = require("pg");

const connectionString =
  "postgres://icykit:zC5UPHaENAenLMezWnFfiBkmov9PlKXk@dpg-ce4anoarrk0djk4lds60-a.frankfurt-postgres.render.com/twitter_development";

const dbTest = async () => {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect().then(() => {});
  const res = await client.query("SELECT * FROM users");
  client.end();
  return res.rows;
};

const app = express();
const port = process.env.PORT || 3001;

app.get("/", async (req, res) => {
  let data = await dbTest();
  res.json(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
