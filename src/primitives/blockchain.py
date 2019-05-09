from block import Block
from datetime import datetime


def createGenesisBlock():
    microUnix = datetime.now().microsecond
    return Block(0, microUnix, "Let's create our chain...", "Im definitely not a hash value")


class Blockchain:
    def __init__(self):
        self.chain = [createGenesisBlock()]

    def getLatestBlock(self):
        return self.chain[-1]

    def addBlock(self, block):
        self.chain.append(block)

    def toString(self):
        retStr = "Blockchain:\n"
        for block in self.chain:
            retStr += block.toString()
        return retStr


blockchain = Blockchain()
print(blockchain.toString())
