const app = require("express")();
const MongoClient = require("mongodb").MongoClient;

const basePath = "/centralia-coin";
const port = 4000;
const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true
});

function getBlockchain(db, callback) {
  db.collection("blocks")
    .find({})
    .toArray((_, docs) => {
      callback(docs);
    });
}

client.connect(err => {
  if (err) {
    return err;
  }
  db = client.db("centralia-coin");

  app.get(`${basePath}/get-blockchain`, (req, res) => {
    getBlockchain(db, docs => {
      res.send(docs);
    });
  });

  app.post(`${basePath}/add-block`, (req, res) => {
    db.collection("blocks").insertOne(
      { name: "tony", lastName: "doof" },
      (err, result) => {
        getBlockchain(db, docs => {
          res.send(docs);
        });
      }
    );
  });

  app.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
  });
});
