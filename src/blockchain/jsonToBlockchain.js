const Blockchain = require("./Blockchain").default;
const Transaction = require("./Transaction").default;
const Block = require("./Block").default;

function jsonToBlockchain(jsonString, updateChain, isServer) {
  const blockchain = new Blockchain(4, updateChain, isServer);
  const blockchainEnc = JSON.stringify(jsonString);
  for (block in blockchainEnc) {
    const txs = [];
    for (tx in blockchainEnc.transactions) {
      const curTx = new Transaction(null, null, null);
      curTx.fromAddress = tx.fromAddress;
      curTx.toAddress = tx.toAddress;
      curTx.amount = tx.amount;
      curTx.timestamp = tx.timestamp;
      txs.push(curTx);
    }
    const curBlock = new Block(null, null, null, null);
    curBlock.previousHash = block.previousHash;
    curBlock.timestamp = block.timestamp;
    curBlock.transactions = txs;
    curBlock.nonce = block.nonce;
    curBlock.index = block.index;
    curBlock.hash = block.hash;
    blockchain.chain.push(curBlock);
  }
  return blockchain;
}

module.exports = {
  default: jsonToBlockchain
};
