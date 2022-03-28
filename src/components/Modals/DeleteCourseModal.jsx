import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useCoursePage } from "../../services/Hooks/CoursePageHook";
import ResultDeleteCourseModal from "./ResultDeleteCourseModal";

function DeleteCourseModal(props) {
  const {
    deleteCourse,
    resultDeleteCourseModalShow,
    setResultDeleteCourseModalShow,
    result,
  } = useCoursePage();

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Excluir curso</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Você tem certeza de que deseja excluir esse curso? Essa ação não
          poderá ser desfeita.
        </Modal.Body>

        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "rgb(191, 46, 60)",
              border: "none",
              boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
            }}
            onClick={() => {
              props.onHide();
            }}
          >
            Cancelar
          </Button>
          <Button
            style={{
              backgroundColor: "#14B8A6",
              border: "none",
              boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
            }}
            onClick={(_) => {
              deleteCourse(props.course.id);
              props.onHide();
            }}
          >
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
      <ResultDeleteCourseModal
        show={resultDeleteCourseModalShow}
        onHide={() => setResultDeleteCourseModalShow(false)}
        course={props.course}
        result={result}
      />
    </>
  );
}

export default DeleteCourseModal;
