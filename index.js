
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('mysql');
var JSAlert = require("js-alert");

const con=db.createConnection({
  localAddress:"127.0.0.1",
  user:"root",
  password:"rootroot",
  database: "lowes"
});

//const con = db.createConnection('mysql://root:rootroot@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');
con.connect((err)=>{
    if(!err)
    console.log("Connected");
    if(err)
    console.log(err);
});

var port=process.env.PORT || 8080;

app.set('view engine','ejs');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/", function(req,res){
  res.render("form",{
    derr: null
  });
});

app.post("/", function(req,res){
  console.log(req.body);
  var a=parseInt(req.body.rating);
  console.log(a);
  var sql= "INSERT INTO `lowes`.`form`(`name`,`email`,`rating`,`reviews`) VALUES (?,?,?,?)";
  var values= [req.body.name,req.body.email ,a,req.body.review];
  con.query(sql,values, function (err, result) {
      if(err.code=='ER_DUP_ENTRY'){
        res.render("form", {
          derr: 'err'
        });
    }
    else{
      if (err) {
        console.log(err.code);
        throw err;
      }
      else{
      res.redirect("/",{
        derr: null
      });
    }
  }
    //console.log("Number of records inserted: " + result.affectedRows);
});
});

app.listen(port);
