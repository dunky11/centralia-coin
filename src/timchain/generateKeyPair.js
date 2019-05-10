var EC = require("elliptic").ec;

function generateKeyPair() {
  const ec = new EC("secp256k1");
  const key = ec.genKeyPair();
  return { pk: key.getPublic("hex"), sk: key.getPrivate("hex") };
}

export default generateKeyPair;
