from block import Block
from datetime import datetime
import time


def createGenesisBlock():
    unix = time.time()
    return Block(0, unix, "Let's create our chain...", "Im definitely not a hash value")


class Blockchain:
    def __init__(self, difficulty):
        self.chain = [createGenesisBlock()]
        self.difficulty = difficulty

    def getLatestBlock(self):
        return self.chain[-1]

    def addBlock(self, block):
        block.prevHash = self.getLatestBlock().hash
        block.mineBlock(self.difficulty)
        self.chain.append(block)

    def isValidChain(self):
        # We skip the genesis block
        for i in range(1, len(self.chain)):
            curBlock = self.chain[i]
            prevBlock = self.chain[i - 1]
            if(curBlock.hash != curBlock.calculateHash()):
                return False
            if(curBlock.prevHash != prevBlock.hash):
                return False
        return True

    def toString(self):
        retStr = "Blockchain:\n\n"
        for block in self.chain:
            retStr += f"{block.toString()}\n"
        return retStr


blockchain = Blockchain(4)
blockchain.addBlock(Block(1, time.time(), {"coins": 10}))
blockchain.addBlock(Block(2, time.time(), {"coins": 123}))
blockchain.addBlock(Block(3, time.time(), {"coins": 110}))
blockchain.addBlock(Block(4, time.time(), {"coins": 231}))
blockchain.addBlock(Block(5, time.time(), {"coins": 123}))
print(blockchain.isValidChain())
