import server from "./server";

function Wallet({ address, setAddress, signature, setSignature, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  const onChangeSignature = (evt) => {
    setSignature(evt.target.value);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Your Address:
        <input placeholder="Type your wallet address" value={address} onChange={onChange}></input>
      </label>

      <label>
        Signature for Transaction:
        <input placeholder="Type the signature for this tx" value={signature} onChange={onChangeSignature}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
