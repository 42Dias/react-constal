import { Modal, Button } from "react-bootstrap";

function ResultCreateCourseModal(props) {
  return (
    <Modal {...props} centered animation={false}>
      <>
        <Modal.Header closeButton={false}>
          <Modal.Title>Adicionar curso</Modal.Title>
        </Modal.Header>
        {props.result !== null && props.result === 201 ? (
          <Modal.Body>
            O curso <strong>{props.course.title}</strong> foi adicionado com
            sucesso!
          </Modal.Body>
        ) : (
          <Modal.Body>
            Ops! Ocorreu um problema ao adicionar o curso{" "}
            <strong>{props.course.title}</strong>. Tente novamente.
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button
            style={{
              backgroundColor: `${
                props.result === 201 ? "#14B8A6" : "rgb(191, 46, 60)"
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

export default ResultCreateCourseModal;
