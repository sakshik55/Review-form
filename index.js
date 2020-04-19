
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;
// const db = require('mysql');
const session        = require('express-session'),
      cookieParser   = require('cookie-parser'),
      flash          = require('connect-flash');


// const con=db.createConnection({
//   localAddress:"127.0.0.1",
//   user:"root",
//   password:"rootroot",
//   database: "lowes"
// });
var collection;
const uri = "mongodb+srv://sakshik_55:sakshidumdum@cluster0-cv6ih.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, function(err,client) {
   if(err) {
        return console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
    collection = client.db("test").collection("devices");
 });


// con.connect((err)=>{
//     if(!err)
//     console.log("Connected");
//     if(err)
//     console.log(err);
// });

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
  collection.insert(req.body, (error, result) => {
       if(error) {
           return res.status(500).send(error);
       }
       res.render("form",{derror: 'success'});
   });
//   var sql= "INSERT INTO `lowes`.`form`(`name`,`email`,`rating`,`reviews`) VALUES (?,?,?,?)";
//   var values= [req.body.name,req.body.email ,a,req.body.review];
//   con.query(sql,values, function (err, result) {
//       if( err && err.code=='ER_DUP_ENTRY'){
//         console.log(err.code);
//         res.render("form",{
//             derror: 'error'
//         });
//     }
//     else{
//       if (err) {
//         console.log(err.code);
//         throw err;
//       }
//       else{
//       res.render("form",{
//         derror : 'success'
//       });
//     }
//   }
// });
});

app.listen(port);
