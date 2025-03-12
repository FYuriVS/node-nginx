const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL");
});

app.get("/", (req, res) => {
  const name = `User ${Math.floor(Math.random() * 1000)}`;
  db.query(`
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `);

  db.query(`INSERT INTO people(name) VALUES('${name}')`);
  db.query("SELECT * FROM people", (err, results) => {
    if (err) {
      res.send("Erro ao buscar nomes");
      return;
    }

    let names = results.map((person) => `<li>${person.name}</li>`).join("");
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${names}</ul>`);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
