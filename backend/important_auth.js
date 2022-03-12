const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
 
const app = express();
 
app.use(cors());
// parse application/json
app.use(bodyParser.json());
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://testabc112:test1234@cluster0.vmz8k.mongodb.net/abc?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.post("/create_account", async (req, res) => {    
    client.connect(err => {
        const collection = client.db("abc").collection("abc11").insertOne({ first_name: req.body.first_name,last_name: req.body.last_name,email: req.body.email ,password: req.body.password });
      });
  });
  
app.post("/signin_account", async (req, res) => {
    client.connect(err => {
    const collection = client.db("abc").collection("abc11")
    console.log("Sign in body",req.body)
    collection.find({email
        :req.body.email,password:req.body.password}).toArray(function(err, docs) {
            if(docs.length==1)
            {
                window.location.href="/login_success"
            }
            else
            {
                res.redirect("/")
            }
    });
})
      
  });
  
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
