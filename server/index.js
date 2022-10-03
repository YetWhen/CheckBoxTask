const express = require('express')
const app = express()

/* template---get
app.get("/", (req,res) => {
    res.send("origin route /\n")
});
*/
app.get("/", (req,res) => {
    res.send("origin route /\n")
});

app.listen(3001, () => {
    console.log("running on port 3001");
});