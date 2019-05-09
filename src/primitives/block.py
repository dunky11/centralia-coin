from json import dumps
from Crypto.Hash import SHA256


class Block:
    def __init__(self, index, micUnix, data, prevHash=""):
        self.index = index
        self.micUnix = micUnix
        self.data = data
        self.prevHash = prevHash
        self.hash = self.calculateHash()

    def toString(self):
        retStr = "Block:\n"
        retStr += f"-index: {self.index}\n"
        retStr += f"-unix: {self.micUnix}\n"
        retStr += f"-data: {self.data}\n"
        retStr += f"-prevHash: {self.prevHash}\n"
        retStr += f"-hash: {self.hash}\n"
        return retStr

    def calculateHash(self):
        ecodedStr = (str(self.index) + str(self.micUnix) +
                     dumps(self.data) + self.prevHash).encode("UTF-8")
        return SHA256.new(ecodedStr).hexdigest()
