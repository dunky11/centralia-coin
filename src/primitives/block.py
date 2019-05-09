from json import dumps
from Crypto.Hash import SHA256


class Block:
    def __init__(self, index, unix, data, prevHash=""):
        self.index = index
        self.unix = unix
        self.data = data
        self.prevHash = prevHash
        """
        Nonce is used so when we mine a coin we always
        get a new hash and dont end up in an infinite loop
        """
        self.nonce = 0
        self.hash = self.calculateHash()

    def toString(self):
        retStr = "Block:\n"
        retStr += f"-index: {self.index}\n"
        retStr += f"-unix: {self.unix}\n"
        retStr += f"-data: {self.data}\n"
        retStr += f"-prevHash: {self.prevHash}\n"
        retStr += f"-hash: {self.hash}\n"
        retStr += f"-nonce: {self.nonce}\n"
        return retStr

    def calculateHash(self):
        ecodedStr = (str(self.index) + str(self.unix) +
                     dumps(self.data) + self.prevHash + str(self.nonce)).encode("UTF-8")
        return SHA256.new(ecodedStr).hexdigest()

    """
    As we need proof of work, to validate that the blockchain is
    not a completely different, calculated by someone else, all
    hashes must have difficulty '0's as the first characters
    """

    def mineBlock(self, difficulty):
        zeros = ""
        """
        PyLint will set unused variable for i if we define it
        without _ (means intentionally used)
        """
        for _ in range(0, difficulty):
            zeros += "0"
        while(self.hash[0:difficulty] != zeros):
            self.hash = self.calculateHash()
            self.nonce += 1

        print("---- New block was mined ----\n")
        print(self.toString())
