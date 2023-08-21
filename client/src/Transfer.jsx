import { useState } from "react";
import server from "./server";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { secp256k1 as secp } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { v4 as uuidv4 } from "uuid";

function Transfer({
  address,
  setBalance,
  privateKey,
  setAlertState,
  setAlertMessage,
  setIsError,
  setTransactionHistory,
  transactionHistory,
}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");

  function hashMsg(msg) {
    const _bytes = utf8ToBytes(msg);
    const _hash = keccak256(_bytes);
    const _inHex = toHex(_hash);
    return _inHex;
  }

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const transactionId = uuidv4();

      const hashedMsg = hashMsg(transactionMessage);
      const signature = secp.sign(hashedMsg, privateKey);
      const signed = JSON.stringify({
        r: signature.r.toString(),
        s: signature.s.toString(),
        recovery: signature.recovery,
      });

      const {
        data: {
          message,
          data: { balance },
        },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        message: transactionMessage,
        signed,
      });

      let transactions = [...transactionHistory];

      let newTransaction = {
        id: transactionId,
        sender: address,
        recipient,
        message: transactionMessage,
        amount: sendAmount,
        date: new Date().toLocaleDateString(),
      };

      transactions.unshift(newTransaction);
      setTransactionHistory(transactions);

      setBalance(balance);
      setAlertMessage(message);
      setAlertState(true);
      setIsError(false);

      setTransactionMessage("");
      setRecipient("");
      setSendAmount("");
    } catch (ex) {
      setAlertMessage(ex.response.data.message);
      setAlertState(true);
      setIsError(true);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1 className="text-muted">Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="Enter an amount"
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Message
        <input
          id="messageDescription"
          placeholder="Enter Message"
          value={transactionMessage}
          onChange={setValue(setTransactionMessage)}
        ></input>
      </label>

      <input
        type="submit"
        className="btn btn-success text-center"
        value="Transfer"
      />
    </form>
  );
}

export default Transfer;
