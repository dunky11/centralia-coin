import Transaction from "./Transaction";
import Block from "./Block";

class Blockchain {
  constructor(difficulty, updateChain = false, timestamp = false) {
    this.updateChain = updateChain;
    const genesisBlock = this.createGenesisBlock(
      timestamp ? timestamp : Date.now()
    );
    if (this.updateChain) {
      this.updateChain([genesisBlock]);
    }
    this.chain = [genesisBlock];
    this.difficulty = difficulty;
    this.pendingTransactions = [];
    this.miningReward = 1000;
  }

  needsNewBlock = true;

  createGenesisBlock(timestamp) {
    return new Block(timestamp, [], "", 0);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    if (this.needsNewBlock || this.pendingTransactions.length > 0) {
      const txs = [];
      for (var i = 0; i < this.pendingTransactions.length; i++) {
        let tx = this.pendingTransactions[i];
        if (tx.isValid() && this.hasEnoughCoins(tx)) {
          txs.push(tx);
        }
      }
      txs.push(rewardTx);
      this.curBlock = new Block(
        Date.now(),
        txs,
        this.getLatestBlock().hash,
        this.getLatestBlock().index + 1
      );
      this.pendingTransactions = [];
      this.needsNewBlock = false;
    }
    if (!this.curBlock.mineBlock(this.difficulty, 150)) {
      return false;
    }
    this.chain.push(this.curBlock);
    if (this.updateChain) {
      this.updateChain(this.chain);
    }
    this.pendingTransactions = [];
    this.needsNewBlock = true;
    return true;
  }

  /**
   * Prevent's transactions from wallets which have
   * insufficient coins
   */
  hasEnoughCoins(transaction) {
    if (
      transaction.amount > this.getBalanceOfAddress(transaction.fromAddress)
    ) {
      return false;
    }
    return true;
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must include from and to address");
    }

    if (!transaction.isValid()) {
      throw new Error("Cannot add invalid transaction to chain");
    }

    if (transaction.amount <= 0) {
      throw new Error("Transaction amount should be higher than 0");
    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  getAllTransactionsForWallet(address) {
    const txs = [];

    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address || tx.toAddress === address) {
          txs.push(tx);
        }
      }
    }

    return txs;
  }

  isChainValid() {
    const realGenesis = this.createGenesisBlock(this.chain[0].timestamp);
    realGenesis.timestamp = this.chain[0].timestamp;
    if (JSON.stringify(realGenesis) !== JSON.stringify(this.chain[0])) {
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];

      if (!currentBlock.hasValidTransactions()) {
        console.log("Invalid transactions");
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log("Invalid hash");
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
