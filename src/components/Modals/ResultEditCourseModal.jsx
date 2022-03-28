import { Modal, Button } from "react-bootstrap";

function ResultEditCourseModal(props) {
  return (
    <Modal {...props} centered animation={false}>
      <>
        <Modal.Header closeButton={false}>
          <Modal.Title>Editar curso</Modal.Title>
        </Modal.Header>

        {props.result !== null && props.result === 200 ? (
          <Modal.Body>O curso foi editado com sucesso!</Modal.Body>
        ) : (
          <Modal.Body>
            Ops! Ocorreu um problema ao editar o curso. Tente novamente.
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button
            style={{
              backgroundColor: `${
                props.result === 200 ? "#14B8A6" : "rgb(191, 46, 60)"
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

export default ResultEditCourseModal;
