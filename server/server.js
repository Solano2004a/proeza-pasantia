const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const app = express();

//middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Proeza@77917169",
  database: "proeza",
  port: 3306,
});

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Nothing to see here" });
});

app.get("/profiles", (req, res) => {
  const sql = "SELECT * FROM info_personal INNER JOIN Datos_Laborales";
  // res.status;
  db.query(sql, (err, result) => {
    if (err)
      return res.json({
        message: "something went wrong when trying to get all admins profile",
        error: err,
      });
    return res.json(result);
  });
});

app.post("/profiles", (req, res) => {
  const sql =
    "INSERT INTO administrator (`name`, `username`, `email`, `password`) VALUES (?,?,?,?)";
  const VALUES = [
    req.body.name,
    req.body.username,
    req.body.email,
    req.body.password,
  ];
  db.query(sql, VALUES, (err, result) => {
    if (err)
      return res.json({
        message: "something went wrong when trying to post the data",
        error: err,
      });
    return res.json({ success: "Administrator added successfuly!" });
  });
});

app.patch("/profiles/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE administrator SET `name`=?, `username`=?, `email`=?, `password`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.username,
    req.body.email,
    req.body.password,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});
app.get("/profiles/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "SELECT `name`, `username`, `email`, `password` FROM administrator WHERE `id` = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res.json({
        message: "something went wrong when trying to get admin profile",
        error: err,
      });
    return res.json(result);
  });
});

app.delete("/profiles/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM administrator WHERE `id` = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res.json({
        message: "something went wrong when trying to delete admin profile",
        error: err,
      });
    return res.json({ success: "admin-profile deleted successfuly" });
  });
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
