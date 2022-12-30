const express = require('express')
var cors = require('cors')
var mysql = require('mysql')
const app = express()
const port = 82
app.use(express.json());
app.use(cors())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_js_api"
  });
  
app.get('/', function (req, res) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})


app.post('/', ({ body }, res) => {
  // let myJson = req.body;
  var {name} = body
  let {email} = body
  let {number} = body
  let {password} = body
  if(email == "" || password == "" || number == "" || password == ""){
    res.send("Input Valid creds Please fill all the fields!!");
  }else{
    // console.log(body);
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      //Insert a record in the "customers" table:
      var sql = "INSERT INTO users (email, number, name, password) VALUES ('"+email+"', '"+number+"', '"+name+"', '"+password+"')";
      con.query(sql, function (err, result) {
        if (err) res.send(err.sqlMessage);
        else{res.send("Registeration Successful!!")}
      });
    });
  }
});
app.post('/login', ({ body }, res) => {
  // let myJson = req.body;
  let {email} = body
  let {password} = body
  if(email == "" || password == ""){
    res.send("Input Valid creds Please fill all the fields!!");
  }else{
    // console.log(body);
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      //Insert a record in the "customers" table:
      var sql = "select email, number, name FROM users WHERE email =  '"+email+"'";
      con.query(sql, function (err, result) {
        if (err) res.send(err.sqlMessage);
        else if(result.length > 0){
          if(result[0].password == password){
            res.send(JSON.stringify(result[0]));
          }else{
            res.send("Invalid Password");
          }
        }else{
          res.send("Invalid Email Address")
        }
        // console.log("1 record inserted")+result;
      });
    });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// var express = require('express')
// var cors = require('cors')
// var app = express()


// app.use(cors())

// app.get('/', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })