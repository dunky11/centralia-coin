const Blockchain = require("./Blockchain").default;
const Transaction = require("./Transaction").default;
const Block = require("./Block").default;

function jsonToBlockchain(jsonString, updateChain, isServer) {
  const blockchainEnc = JSON.parse(jsonString);
  const blockchain = new Blockchain(
    4,
    updateChain,
    isServer,
    blockchainEnc[0].timestamp
  );
  for (const block of blockchainEnc) {
    /** Skip genesis block */
    if (block.index === 0) {
      continue;
    }
    const txs = [];
    for (const tx of block.transactions) {
      const curTx = new Transaction(null, null, null);
      curTx.fromAddress = tx.fromAddress;
      curTx.toAddress = tx.toAddress;
      curTx.amount = tx.amount;
      curTx.timestamp = tx.timestamp;
      curTx.signature = tx.signature;
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
