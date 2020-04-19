
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;


// replace the uri string with your connection string.
const uri = "mongodb+srv://sakshik_55:sakshidumdum@cluster0-cv6ih.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");

   collection.insertOne({
     name:'sakshi',
     email:'sakshik_55',
     review:'good',
     rating: 4
   })
   // perform actions on the collection object
   client.close();
});
