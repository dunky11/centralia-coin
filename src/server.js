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
    .find({})
    .toArray((_, blocks) => {
      callback(blocks);
    });
}

/*
function getBlockchainSize(db, callback) {
  db.collection("blocks")
    .countDocuments({}, null)
    .then(size => {
      callback(size);
    });
}
*/

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
    const blockchain = jsonToBlockchain(req.fields.blockchain);

    getBlockchain(db, blocks => {
      if (
        blockchain.isChainValid() &&
        blockchain.chain.length > blocks.length
      ) {
        console.log("isValid");
        /**
         *  synchronizeBlockchain(db, () => {
          res.send(JSON.stringify(blockchain));
        });
         */
        res.send(JSON.stringify(blockchain.chain));
      } else {
        console.log(blockchain.isChainValid());
        console.log(blockchain.chain.length);
        console.log(blocks.length);
        console.log("invalid");
        res.send(JSON.stringify(blocks));
      }
    });
  });

  app.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
  });
});
