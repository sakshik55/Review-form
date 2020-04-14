
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('mysql');
const session        = require('express-session'),
      cookieParser   = require('cookie-parser'),
      flash          = require('connect-flash');


const con=db.createConnection({
  localAddress:"127.0.0.1",
  user:"root",
  password:"rootroot",
  database: "lowes"
});

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
app.use(session({
    secret:"secret",
    saveUninitialized:true,
    resave: false
}));
app.use(cookieParser());


app.get("/", function(req,res){
  res.render("form",{
    derror : null
  });
});

app.post("/", function(req,res){
  console.log(req.body);
  var a=parseInt(req.body.rating);
  console.log(a);
  var sql= "INSERT INTO `lowes`.`form`(`name`,`email`,`rating`,`reviews`) VALUES (?,?,?,?)";
  var values= [req.body.name,req.body.email ,a,req.body.review];
  con.query(sql,values, function (err, result) {
      if( err && err.code=='ER_DUP_ENTRY'){
        console.log(err.code);
        res.render("form",{
            derror: 'error'
        });
    }
    else{
      if (err) {
        console.log(err.code);
        throw err;
      }
      else{
      res.render("form",{
        derror : 'success'
      });
    }
  }
});
});

app.listen(port);
