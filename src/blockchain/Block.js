const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, transactions, previousHash, index) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.index = index;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce +
        this.index
    ).toString();
  }

  mineBlock(difficulty, maxCounter = false) {
    let counter = 0;
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      if (maxCounter && counter > maxCounter) {
        return false;
      }
      this.nonce++;
      counter++;
      this.hash = this.calculateHash();
    }
    return true;
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  }
}

export default Block;
