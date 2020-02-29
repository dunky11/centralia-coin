const Block = require("./Block");

class Blockchain {
  constructor(difficulty) {
    const genesisBlock = this.createGenesisBlock();
    this.chain = [genesisBlock];
    this.difficulty = difficulty;
    this.pendingTransactions = [];
    this.miningReward = 1000;
  }

  createGenesisBlock() {
    return new Block(Date.now(), [], "None", 0);
  }

  isChainValid() {
    const realGenesis = JSON.stringify(this.createGenesisBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
