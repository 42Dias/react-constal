import { Modal, Button } from "react-bootstrap";

function ResultDeleteCategoryModal(props) {
  return (
    <Modal {...props} centered animation={false}>
      <>
        <Modal.Header closeButton={false}>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>

        {props.result !== null && props.result === 200 ? (
          <Modal.Body>A categoria foi excluída com sucesso!</Modal.Body>
        ) : (
          <Modal.Body>
            Ops! Ocorreu um problema ao excluir a categoria. Tente novamente.
          </Modal.Body>
        )}

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

export default ResultDeleteCategoryModal;
