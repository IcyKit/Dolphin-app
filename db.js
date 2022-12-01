const { Client } = require("pg");

export const dbTest = async () => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "DrRespect228",
    database: "twitter_development",
  });
  await client.connect();

  const res = await client.query(`SELECT * FROM users`);
  console.log(res.rows);
  await client.end();
};
