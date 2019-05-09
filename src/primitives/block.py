from json import dumps
from Crypto.Hash import SHA256


class Block:
    def __init__(self, index, unix, transactions, prevHash=""):
        self.index = index
        self.unix = unix
        self.transactions = transactions
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
        retStr += "--- Transactions in block: ---\n"
        for i in range(0, len(self.transactions)):
            retStr += f"-{self.transactions[i].toString()}\n"
        retStr += "--- Transactions in block end ---\n"
        retStr += f"-prevHash: {self.prevHash}\n"
        retStr += f"-hash: {self.hash}\n"
        retStr += f"-nonce: {self.nonce}\n"
        return retStr

    def calculateHash(self):
        ecodedStr = (str(self.index) + str(self.unix) +
                     self.arrayOfInstancesToJson(self.transactions) + self.prevHash + str(self.nonce)).encode("UTF-8")
        return SHA256.new(ecodedStr).hexdigest()

    """
    In python3 instances or an array of instances of a class cannot be converted to json,
    thats why we will do some tricks
    """

    def arrayOfInstancesToJson(self, arr):
        retStr = ""
        for instance in arr:
            # Convert the instance in a dictionary which is serializable
            retStr += dumps(instance.__dict__)
        return retStr

    """
    As we need proof of work, to validate that the blockchain is
    not a completely different, calculated by someone else, all
    hashes must have difficulty '0's as the first characters
    """

    def mineBlock(self, difficulty):
        zeros = ""
        """
        PyLint will mark unused variable for i if we define it
        without _ (means intentionally used)
        """
        for _ in range(0, difficulty):
            zeros += "0"
        while(self.hash[0:difficulty] != zeros):
            self.nonce += 1
            self.hash = self.calculateHash()

        # print("---- New block was mined ----\n")
        # print(self.toString())
