from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

# Encrypt a message using PKCS1_OAEP


def encryptMessage(message, publicKey):
    rsaKey = RSA.importKey(publicKey)
    rsaKey = PKCS1_OAEP.new(rsaKey)
    # In python strings aren't encoded, which means this will throw
    # an exception if we do not convert it to bytes first
    return rsaKey.encrypt(message.encode("UTF-8"))
