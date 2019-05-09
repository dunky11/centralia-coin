

class Block:
    def __init__(self, hashPrevBlock, hashMerkleRoot):
        self.hashPrevBlock = hashPrevBlock
        self.hashMerkleRoot = hashMerkleRoot

    def toString(self):
        retStr = "Block:\n"
        retStr += f"-hashPrevBlock: {self.hashPrevBlock}\n"
        retStr += f"-hashMerkleRoot: {self.hashMerkleRoot}\n"
        return retStr


block = Block("haha", "hehe")
print(block.toString())
