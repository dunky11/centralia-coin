const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const jsonToBlockchain = require("./blockchain/jsonToBlockchain").default;

const app = express();

app.use(formidable());

app.use(cors());

const basePath = "/centralia-coin";
const port = 4000;
const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true
});

function getBlockchain(db, callback) {
  db.collection("blocks")
    .find({}, { projection: { _id: false } })
    .sort({ index: 1 })
    .toArray((_, blockchain) => {
      callback(blockchain);
    });
}

function synchronizeChain(db, blocks, callback) {
  db.collection("blocks")
    .deleteMany({})
    .then(() => {
      db.collection("blocks")
        .insertMany(blocks)
        .then(() => {
          callback();
        });
    });
}

client.connect(err => {
  if (err) {
    return err;
  }
  db = client.db("centralia-coin");

  app.get(`${basePath}/get-blockchain`, (req, res) => {
    getBlockchain(db, blocks => {
      res.send(JSON.stringify(blocks));
    });
  });

  app.post(`${basePath}/add-block`, (req, res) => {
    if (!req.fields.blockchain) {
      res.status(400);
      res.send();
    }
    const blockchain = jsonToBlockchain(req.fields.blockchain);

    getBlockchain(db, blocks => {
      if (
        blockchain.isChainValid() &&
        blockchain.chain.length > blocks.length
      ) {
        synchronizeChain(db, blockchain.chain, () => {
          res.send(JSON.stringify(blockchain.chain));
        });
      } else {
        console.log(blocks);
        res.send(JSON.stringify(blocks));
      }
    });
  });

  app.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
  });
});
