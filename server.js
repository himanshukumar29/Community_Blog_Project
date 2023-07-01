const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 8000;

// fetch('/api/articles/...',{
//   method:'GET'
//   body 
// })

// Initialize middleware
// we use to have to install body parser but now it is a built in middleware
// function of express. It parses incoming JSON payload
app.use(express.json({ extended: false }));

app.get("/api/articles/:name",(req,res)=>{

    const articleName = req.params.name;
    const url = "mongodb://localhost:27017";
    const dbName = "mernblog";
    const client = new MongoClient(url,{useNewUrlParser:true});

    client.connect(function(err) {
      if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
      }
    

      const db = client.db(dbName);
      const articleInfo =  db
         .collection("articles")
         .findOne({name : articleName});
         res.status(200).json({articleInfo});
    
      console.log('Connected successfully to MongoDB');
    
    
    
      // Perform operations on the database
    
      // Close the connection when done
      client.close();
    });
  //   const articleInfo = await dbb
  //        .collection("articles")
  //        .findOne({name : articleName});
  //        res.status(200).json({articleInfo});
  //        //client.close();

  // } catch (error) {
  //   res.status(500).json({Message : "Error connecting to Database",error});
  // }
})


// const withDB = async (operations, res) => {
//   try {
//     const client = await MongoClient.connect("mongodb://localhost:27017");
//     const db = client.db("mernblog");
//     await operations(db);
//     client.close();
//   } catch (error) {
//     res.status(500).json({ message: "Error connecting to database", error });
//   }
// };



// app.get("/",(req,res)=>
//    res.send("Hello World")
// );
app.post('/api/articles/:name/add-comments',(req,res)=>{
   const {username ,text} = req.body;
   const articleName=req.params.name;
   articlesInfo[articleName].comments.push({username,text});
   res.status(200).send(articlesInfo[articleName]);
});
app.get("/hello/:name",(req,res)=>
res.send(`Hell0 ${req.params.name}`)
);







// app.get("/api/articles/:name", async (req, res) => {
//   withDB(async (db) => {
//     const articleName = req.params.name;
//     const articleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });
//     res.status(200).json(articleInfo);
//   }, res);
// });

// app.post("/api/articles/:name/add-comments", (req, res) => {
//   const { username, text } = req.body;
//   const articleName = req.params.name;

//   withDB(async (db) => {
//     const articleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });
//     await db.collection("articles").updateOne(
//       { name: articleName },
//       {
//         $set: {
//           comments: articleInfo.comments.concat({ username, text }),
//         },
//       }
//     );
//     const updateAricleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });
//     res.status(200).json(updateAricleInfo);
//   }, res);
// });

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));