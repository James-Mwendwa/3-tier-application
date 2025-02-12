require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const dbPath = process.env.DATABASE_URL;

// Create a connection to the SQLite database
const db = new sqlite3.Database("./db/customers.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

// Create a table (if it doesn't exist)
db.run(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )
`);

// API endpoint to add a customer
app.post("/api/customers", (req, res) => {
  const { name, email } = req.body;

  // Validate input (basic example)
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  db.run(
    "INSERT INTO customers (name, email) VALUES (?, ?)",
    [name, email],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Customer added successfully" });
    }
  );
});

// API endpoint to get all customers
app.get("/api/customers", (req, res) => {
  db.all("SELECT * FROM customers", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
