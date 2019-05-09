from Crypto.PublicKey import RSA


def generateKeyPair():
    keyPair = RSA.generate(2048)
    secretKey = keyPair.export_key("PEM")
    publicKey = keyPair.publickey().export_key("PEM")
    return {'pk': publicKey, 'sk': secretKey}
