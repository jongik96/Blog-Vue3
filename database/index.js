let sqlite3 = require("sqlite3");
const sqlite3 = require("sqlite3");
const express = require("express");
const cors = require("cors");
const app = express();
app.disable("x-powered-by");
app.use(cors());

const PORT = 8000;
let db = new sqlite3.Database("database.db", (err) => {
  if (!err) {
    db.run("CREATE TABLE tbl_about_myself (name TEXT, email TEXT, UNIQUE(name,email))", (err2) => {
      if (!err2) {
        db.run("INSERT OR IGNORE INTO tbl_about_myself (name, email) VALUES ('JONGIK', 'pji3504@naver.com')");
      }
    });
    db.run('CREATE TABLE IF NOT EXISTS tbl_my_resume (data DATE, title TEXT, content TEXT, URL TEXT, UNIQUE(date, title))',
      (err2) => {
        if (!err2) {
          const resume = [
            {
              date: '1996-09-10',
              title: '출생',
              content: '응애',
              URL: 'jongik.tistory.com'
            },
          ]
          resume.forEach((item) => {
            const query = `INSERT OR IGNORE INTO tbl_my_resume (date,title,content,URL) VALUES ('${item.date}', '${item.title}', '${item.content}', '${item.URL}')`
            db.run(query)
          })
        }
      })
  }
});

app.listen(PORT, () => {
  console.log(`Listening... ${PORT}`);
});

app.get("/", (req, res, next) => {
  res.json({ rsp: "ok" });
});

app.get("/db/about-me", (req, res, next) => {
  let result = {
    rsp: 'fail',
  }
  db.get('SELECT * FROM tbl_about_myself', (err, row) => {
    if (!err) {
      result.data = row
      db.all("SELECT * FROM tbl_about_resume ORDER BY date desc", (err2, rows) => {
        if (!err2) {
          result.rsp = 'ok'
          result.data.resume = rows
          res.json(result)
        } else {
          res.json(result)
        }
      });
    } else {
      res.json(result);
    }
  })

});

db.get('SELECT * FROM tbl_about_myself', (err, row) => {
  if (!err) {
    result.data = row;
    db.all('SELECT * FROM tbl_my_resume ORDER BY date desc', (err2, rows) => {
      if (!err2) {
        result.rsp = 'ok'
        result.data.resume = rows
        res.json(result);
      } else {
        res.json(result)
      }
    })
  } else {
    res.json(result)
  }
})
