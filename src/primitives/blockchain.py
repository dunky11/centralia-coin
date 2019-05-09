from block import Block
from transaction import Transaction
from datetime import datetime
from time import time


def createGenesisBlock():
    return Block(0, time(), [])


class Blockchain:
    def __init__(self, difficulty):
        self.chain = [createGenesisBlock()]
        self.difficulty = difficulty
        self.pendingTransactions = []
        """
        Reward send to the rewardAddress when creating a new block
        in timoshis
        """
        self.miningReward = 1000

    def getLatestBlock(self):
        return self.chain[-1]

    def minePendingTransactions(self, miningRewardAddr):
        block = Block(self.getLatestBlock().index + 1,
                      time(), self.pendingTransactions)
        block.prevHash = self.getLatestBlock().hash
        block.mineBlock(self.difficulty)
        self.chain.append(block)
        """
        Empty the array and append the transaction to reward
        the miner
        """
        self.pendingTransactions = [Transaction(
            None, miningRewardAddr, self.miningReward)]

    def createTransaction(self, transaction):
        self.pendingTransactions.append(transaction)

    def getAddressBalance(self, address):
        timoshis = 0
        for block in self.chain:
            for transaction in block.transactions:
                if transaction.toAddr == address:
                    timoshis += transaction.timoshis
                elif transaction.fromAddr == address:
                    timoshis -= transaction.timoshis
        return timoshis

    def isValidChain(self):
        # We skip the genesis block
        for i in range(1, len(self.chain)):
            curBlock = self.chain[i]
            prevBlock = self.chain[i - 1]
            if(curBlock.hash != curBlock.calculateHash()):
                print(
                    f"Not a valid chain at index {curBlock.index}: curblock.hash != curBlock.calculateHash()")
                print(f"curBlock.hash: {curBlock.hash}")
                print(f"curBlock.calc: {curBlock.calculateHash()}")
                return False
            if(curBlock.prevHash != prevBlock.hash):
                print("Not a valid chain: curBlock.prevHash != prevBlock.hash")
                print(f"curBlock.prevHash: {curBlock.prevHash}")
                print(f"   prevBlock.hash: {prevBlock.hash}")
                return False
        return True

    def toString(self):
        retStr = "Blockchain:\n\n"
        for block in self.chain:
            retStr += f"{block.toString()}\n"
        return retStr


blockchain = Blockchain(3)
blockchain.minePendingTransactions("adasdadasd")
blockchain.minePendingTransactions("adasdadasd")
blockchain.minePendingTransactions("adasdadasd")
blockchain.minePendingTransactions("adasdadasd")

print(blockchain.toString())

print(blockchain.isValidChain())
