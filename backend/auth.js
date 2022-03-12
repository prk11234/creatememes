const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const {localStorage} = require("node-localstorage")
 
const app = express();
 
app.use(cors());
// parse application/json
app.use(bodyParser.json());
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://testabc112:test1234@cluster0.vmz8k.mongodb.net/abc?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.post("/create_account",(req, res) => {  
  //alert("called again")  
  console.log("account created",req.body)
  
    client.connect(err => {

        const collection = client.db("abc").collection("abc11");
        
         
            collection.insertOne({ first_name: req.body.first_name,last_name: req.body.last_name,email: req.body.email ,password: req.body.password,photo_publish:[] });
    
       
      });
  });
  app.post("/email_check",(req, res) => {  
    //alert("called again")  
    
      client.connect(err => {
  
          const collection = client.db("abc").collection("abc11");
          collection.find({email:req.body.email}).toArray(function(err, docs) {
            res.send(docs)
          });         
        });
    });
  app.post("/publish_image",(req, res) => {  
    
      client.connect(err => {
        const collection = client.db("abc").collection("abc11")
        console.log(req.body.email)
        collection.update({email:req.body.email},{$push: {photo_publish: {blob:req.body.blob,like:"0",dislike:"0"}}})
        
        
        
        });
    });
  
app.post("/signin_account", async (req, res) => {
  console.log("response",req.body)
    client.connect(err => {
    const collection = client.db("abc").collection("abc11")
    collection.find({email:req.body.email,password:req.body.password}).toArray(function(err, docs) {
      console.log(docs)
      res.send(docs)
    });
})      
  });
  
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
