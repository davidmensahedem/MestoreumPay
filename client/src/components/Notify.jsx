import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Notify({ showAlert, setAlertState, alertMessage,isError,setIsError }) {
  const toggleAlert = () => setAlertState(!showAlert);

  function renderToastStyle(isError){
    return isError ? "toastStyle bg-danger" : "toastStyle bg-success";
  }

  return (
    <Toast
      className={renderToastStyle(isError)}
      variant="bg-danger"
      show={showAlert}
      onClose={toggleAlert}
      animation={true}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto text-center">{alertMessage}</strong>
      </Toast.Header>
    </Toast>
  );
}

export default Notify;
