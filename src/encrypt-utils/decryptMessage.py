from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

# Decrypt a message using PKCS1_OAEP


def decryptMessage(message, privateKey):
    rsaKey = RSA.importKey(privateKey)
    rsaKey = PKCS1_OAEP.new(rsaKey)
    # We casted the message to bytes, so we should transform
    # it to a string again
    return rsaKey.decrypt(message)
