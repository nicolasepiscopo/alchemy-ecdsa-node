const { signSync, p } = require('ethereum-cryptography/secp256k1');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');

const amount = process.argv[2]
const recipient = process.argv[3]
const privateKey = process.argv[4]

const signature = toHex(signSync(toHex(utf8ToBytes(`${amount}:${recipient}`)), privateKey));

console.log({
  signature,
})