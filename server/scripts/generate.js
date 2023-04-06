const { utils, getPublicKey } = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');

// node generate.js 3 -> this would generate 3 key pairs
const times = process.argv[2]

for (let i = 0; i < times; i++) {
  const privateKey = toHex(utils.randomPrivateKey());
  console.log({
    privateKey,
    publicKey: toHex(getPublicKey(privateKey)),
  })
}