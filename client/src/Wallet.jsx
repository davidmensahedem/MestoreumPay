import { Badge } from "react-bootstrap";
import server from "./server";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  setAlertState,
  setAlertMessage,
  setIsError
}) {
  async function onChange(evt) {
    const address = evt.target.value;
    try {
      setAddress(address);
      if (address) {
        const { data: result } = await server.get(`balance/${address}`);
        setBalance(result.data.balance);
      } else {
        setBalance(0);
      }
    } catch (ex) {
      setAlertMessage(ex.response.data.message);
      setAlertState(true);
      setIsError(true);
    }
  }

  return (
    <div className="container wallet">
      <h1 className="text-muted">Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance text-center">Balance: <Badge className="bg-success">{balance}</Badge></div>
    </div>
  );
}

export default Wallet;
