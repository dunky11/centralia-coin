import SHA256 from "crypto-js/sha256";

class Block {
  constructor(timestamp, transactions, previousHash = "", index = 0) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.index = index;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    let txStr = "";
    if (this.transactions) {
      for (const tx of this.transactions) {
        txStr += tx.calculateHash();
      }
    }
    return SHA256(
      this.previousHash + this.timestamp + txStr + this.nonce + this.index
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
