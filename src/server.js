const app = require("express")();
const cors = require("cors");
const formidable = require("express-formidable");
const MongoClient = require("mongodb").MongoClient;

app.use(formidable());

app.use(cors());

const basePath = "/centralia-coin";
const port = 4000;
const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true
});

function getBlockchain(db, callback) {
  db.collection("blocks")
    .find({})
    .toArray((_, blocks) => {
      callback(blocks);
    });
}

function getBlockchainSize(db, callback) {
  db.collection("blocks")
    .countDocuments({}, null)
    .then(size => {
      callback(size);
    });
}

client.connect(err => {
  if (err) {
    return err;
  }
  db = client.db("centralia-coin");

  app.get(`${basePath}/get-blockchain`, (req, res) => {
    console.log(req);
    getBlockchainSize(db, size => {
      getBlockchain(db, blocks => {
        res.send(blocks);
      });
    });
  });

  app.post(`${basePath}/add-block`, (req, res) => {
    if (!req.fields.blockchain) {
      res.status(400);
      res.send();
    }
    const blockchain = JSON.parse(req.fields.blockchain);
    res.send(blockchain);
  });

  app.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
  });
});
