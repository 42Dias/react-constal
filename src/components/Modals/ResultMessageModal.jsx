import { Modal, Button } from "react-bootstrap";

function ResultMessageModal(props) {
  return (
    <Modal {...props} centered animation={false}>
      <>
        <Modal.Header closeButton={false}>
          <Modal.Title>{props.status ? "Sucesso!" : "Ops!"}</Modal.Title>
        </Modal.Header>
        {props.status ? (
          <Modal.Body>
            Sua resposta a mensagem foi enviada com sucesso!
          </Modal.Body>
        ) : (
          <Modal.Body>
            Ops! Ocorreu um erro ao enviar sua resposta. Tente novamente, por
            favor!
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button
            style={{
              backgroundColor: `${
                props.status ? "#14B8A6" : "rgb(191, 46, 60)"
              }`,
              border: "none",
              boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
            }}
            onClick={() => {
              props.onHide();
            }}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </>
    </Modal>
  );
}

export default ResultMessageModal;
