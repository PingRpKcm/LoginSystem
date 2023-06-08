const express = require("express");
const moment = require("moment");
require("moment-timezone");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "react_test",
});

//timezone thai utc+7
const datetime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");

app.post("/api/register", jsonParser, (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const username = req.body.username;
    const password = hash;
    const email = req.body.email;
    const create_date = datetime;
    const update_date = datetime;

    db.query(
      "INSERT INTO react2 (username, password, email, create_date, update_date) VALUES (?,?,?,?,?)",
      [username, password, email, create_date, update_date],
      (err, result) => {
        if (err) {
          res.json({ status: false, message: err });
        } else {
          res.json({ status: true });
        }
      }
    );
  });
});

app.post("/api/login", jsonParser, (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT username, password FROM react2 WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.json({ status: false, message: err });
        return;
      }
      if (result.length == 0) {
        res.json({ status: false, message: "NotFound" });
        return;
      }
      console.log(req.body.password);
      console.log(result[0].password);
      bcrypt.compare(
        req.body.password,
        result[0].password,
        function (err, isLogin) {
          console.log(isLogin);
          if (isLogin) {
            res.json({ status: true, message: "success" });
          } else {
            res.json({ status: false, message: "fail" });
          }
        }
      );
    }
  );
});

app.post("/api/profile", jsonParser, (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT username, email, create_date, update_date FROM react2 WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.json({ status: false, message: err });
        return;
      } else {
        res.json({status:true, message: result})
      }

    }
  );
});

app.post("/test", jsonParser, (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const username = req.body.username;
    const password = hash;

    db.query("SELECT ");
    res.json({ status: hash });
  });
});

app.listen("3001", () => {
  const datetime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
  console.log(datetime);
  console.log("Server is running on port 3001");
});
