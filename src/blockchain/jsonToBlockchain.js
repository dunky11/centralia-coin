import Blockchain from "./Blockchain";
import Transaction from "./Transaction";
import Block from "./Block";

function jsonToBlockchain(jsonString, updateChain) {
  const blockchainDec = JSON.parse(jsonString);
  if (blockchainDec.length === 0) {
    return { chain: [] };
  }
  const blockchain = new Blockchain(4, updateChain, blockchainDec[0].timestamp);
  for (const block of blockchainDec) {
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

export default jsonToBlockchain;
