const express = require("express");
const app = express();
const cors = require("cors");
const { verify } = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "040c05eca154e27b01fcd394d368e0759be22c378f0c55dbd3392f297467e7ba629558c7ec3b2077aa54d91bb83986520fb0656db3cf5a8cc7cd6022cc790d4ec3": 100,
  "0498ac6cac53adb4db01b4e5e57ab509ac75271123220bb9b08598d98f4fc4ceb9704141d4d3fc76a5440b55544a27a9cb534aaa94ae61fb5b5c01aeba25202821": 50,
  "04f34999f03ac528f16164d3bcf1cbe7ee000c27b64d3c464f5e7c2a679a77d86768fe62df2d6b8fba5e4da6d5a0dda6e3b4c9dc87f569421c0daf16172e1f6e2b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  const isValid = verify(signature, toHex(utf8ToBytes(`${amount}:${recipient}`)), sender);

  if (!isValid) {
    res.status(403).send({ message: "Invalid signature!" });
    return;
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
