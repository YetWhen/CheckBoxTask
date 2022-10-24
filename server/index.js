const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const port=3001
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "taskdatabase",
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

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
app.get("/", (req,res) => {
  res.send("test");
});
app.delete("/database/clean",(req,res) => {
  const sqlTruncate = "TRUNCATE TABLE tasks;"
  db.query(sqlTruncate, (err,result) => {
    res.send(result);
  })
});
app.get("/test", (req,res) => {

    //this is the code inserting data into table "tasks" in database, 
    //edit a string and use the db.query() to send the string to database instance db
    const sqlInsert = "INSERT INTO tasks (taskName, description, createDate, dueDate) VALUES ('taskname', 'Description test','2022-10-03','2022-12-03');";
    db.query(sqlInsert, (err, result)=>{
        res.send("task created");
    })
});

app.get("/api/get", (req,res) => {
  const sqlSelect = "SELECT * FROM tasks";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res)=> {
  const taskName = req.body.taskName
  const description = req.body.description
  const dueDate = req.body.dueDate
  /*
  const d= new Date();
  var createDate = d.toISOString().split('T')[0];
  */
  const createDate = req.body.createDate
  /*
  if (taskName == ''){
    res.send("taskName shouldn't be empty");
  }else if (description == ''){
    res.send("task description shouldn't be empty");
  }else if (dueDate == ''){
    res.send("dueDate shouldn't be empty");
  }*/
  const sqlInsert = "INSERT INTO tasks (taskName, description, createDate, dueDate) VALUES (?,?,?,?)"
  db.query(sqlInsert, [taskName, description, createDate, dueDate], (err, result)=>{
      console.log("successfully added task: "+ taskName + " to database");
  });
});

app.delete("/api/delete/:taskid", (req,res)=>{
  const id = req.params.taskid;
  const sqlDelete = "DELETE FROM tasks WHERE id = ?";
  db.query(sqlDelete, id, (err,result) =>{
      if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const id =req.body.id;
  const description = req.body.description;
  const sqlUpdate = "UPDATE tasks SET description = ? WHERE id = ?"
  db.query(sqlUpdate, [description, id], (err, result) => {
    if (err) console.log(err);
  });
});
app.listen(port, () => {
    console.log("running on port 3001");
});