import { Modal, Button } from "react-bootstrap";

function ResultDeleteVideoModal(props) {
  return (
    <Modal {...props} centered animation={false}>
      <>
        <Modal.Header closeButton={false}>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          O video <strong>{props.video}</strong> foi deletado com sucesso!
        </Modal.Body>

        {/* <Modal.Body>
          Ops! Ocorreu um problema ao adicionar o curso{" "}
          <strong>{props.course.title}</strong>. Tente novamente.
        </Modal.Body> */}

        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#14B8A6",
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

export default ResultDeleteVideoModal;
