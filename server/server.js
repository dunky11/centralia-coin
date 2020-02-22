const app = require("express")();
const MongoClient = require("mongodb").MongoClient;

const port = 4000;

MongoClient.connect("mongodb://localhost:27017", function(err, client) {
  if (err) return console.log(err);
  db = client.db("centralia-coin");
  blocks = db.collection("blocks");

  app.get("/get-blockchain", function(req, res) {
    res.send(blocks.find({}));
  });

  app.post("/add-block", function(req, res) {
    console.log(req);
    res.send("add-block");
  });

  app.listen(port, function() {
    console.log(`Express server is listening on port ${port}!`);
  });
  db.close();
});
