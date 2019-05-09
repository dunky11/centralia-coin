from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA


def signMessage(message, secretKey):
    key = RSA.import_key(secretKey)
    hashed = SHA256.new(message)
    return pkcs1_15.new(key).sign(hashed)
