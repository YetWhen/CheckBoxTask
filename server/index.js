const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "taskdatabase",
});
/* testing connection, if sql server not updated, refer to following website
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "taskdatabase"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO tasks (taskName, description) VALUES ('taskname', 'Description test')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
*/
/* template---get
app.get("/", (req,res) => {
    res.send("origin route /\n")
});
*/

app.get("/test", (req,res) => {

    //this is the code inserting data into database, edit a string and use the db.query() to send the string
    const sqlInsert = "INSERT INTO tasks (taskName, description, createDate, dueDate) VALUES ('taskname', 'Description test','2022-10-03','2022-12-03');";
    db.query(sqlInsert, (err, result)=>{
        res.send("task created");
    })
});

app.listen(3001, () => {
    console.log("running on port 3001");
});