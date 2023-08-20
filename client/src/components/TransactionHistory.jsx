import Table from "react-bootstrap/Table";

function TransactionHistory({ transactionHistory }) {
  return (
    <Table bordered hover className="mt-3" variant="dark" responsive>
      <thead>
        <tr className="bg-success">
          <th>Id</th>
          <th>Sender</th>
          <th>Recipient</th>
          <th>Amount</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactionHistory.length > 0 &&
          transactionHistory.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.sender}</td>
              <td>{t.recipient}</td>
              <td>{parseFloat(t.amount).toFixed(2)}</td>
              <td>{t.message}</td>
              <td>{t.date}</td>
            </tr>
          ))}
          
      </tbody>
    </Table>
  );
}

export default TransactionHistory;
