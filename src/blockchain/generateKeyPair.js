import EC from "elliptic";
const ec = new EC.ec("secp256k1");

function generateKeyPair() {
  const key = ec.genKeyPair();
  return { pk: key.getPublic("hex"), sk: key.getPrivate("hex") };
}

export default generateKeyPair;
