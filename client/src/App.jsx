import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { useState } from "react";
import Notify from "./components/Notify";
import { Col, Row, Container } from "react-bootstrap";
import TransactionHistory from "./components/TransactionHistory";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [showAlert, setAlertState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [privateKey, setPrivateKey] = useState(import.meta.env.VITE_ENCODED);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Wallet
              balance={balance}
              setBalance={setBalance}
              address={address}
              setAddress={setAddress}
              setAlertState={setAlertState}
              setAlertMessage={setAlertMessage}
              isError={isError}
              setIsError={setIsError}
            />
          </Col>
          <Col>
            <Transfer
              setBalance={setBalance}
              address={address}
              privateKey={privateKey}
              setAlertState={setAlertState}
              setAlertMessage={setAlertMessage}
              isError={isError}
              setIsError={setIsError}
              setTransactionHistory={setTransactionHistory}
              transactionHistory={transactionHistory}
            />
          </Col>
        </Row>
      </Container>
      <Container className="mt-3 bg-light">
        <h3 className="text-center">Transaction history</h3>
        <Container fluid>
          <Row>
            <Col>
              {transactionHistory.length > 0 ? (
                <TransactionHistory transactionHistory={transactionHistory} />
              ) : (
                <div className="p-4 bg-white">
                  <p className="text-center">No transaction history.</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
      <Notify
        showAlert={showAlert}
        alertMessage={alertMessage}
        setAlertState={setAlertState}
        isError={isError}
      />
    </>
  );
}

export default App;
