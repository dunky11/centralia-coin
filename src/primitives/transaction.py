

class Transaction:
    def __init__(self, fromAddr, toAddr, timoshis):
        self.fromAddr = fromAddr
        self.toAddr = toAddr
        self.timoshis = timoshis

    def toString(self):
        retStr = "Transaction:\n"
        retStr += f"-fromAddr: {self.fromAddr}\n"
        retStr += f"-toAddr: {self.toAddr}\n"
        retStr += f"-timoshis: {self.timoshis}"
        return retStr
