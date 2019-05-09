from encryptMessage import encryptMessage
from decryptMessage import decryptMessage
from generateKeyPair import generateKeyPair
from signMessage import signMessage
from verifySignature import verifySignature

keyPair = generateKeyPair()
publicKey = keyPair["pk"]
secretKey = keyPair["sk"]

# strings are not encoded in python3 and therefore cannot be encrypted
# we have to convert it to bytes first
message = "Hallo Welt!"
ciphertext = encryptMessage(message, publicKey)
print(f"Encrypted message: \n {ciphertext}\n")
signature = signMessage(ciphertext, secretKey)
print(f"The messages signature is: \n {signature}\n")
cleartext = decryptMessage(ciphertext, secretKey)
print(f"Decrypted message: \n {cleartext}\n")

invalidSignature = "Im a invalid signature"
print(
    f"Invalid signature is {verifySignature(ciphertext, invalidSignature, publicKey)}")
print(
    f"Valid signature is {verifySignature(ciphertext, signature, publicKey)}")
