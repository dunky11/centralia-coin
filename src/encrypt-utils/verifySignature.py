from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA


def verifySignature(ciphertext, signature, publicKey):
    key = RSA.import_key(publicKey)
    hashed = SHA256.new(ciphertext)
    try:
        pkcs1_15.new(key).verify(hashed, signature)
        return True
    except (ValueError, TypeError):
        return False
