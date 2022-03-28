import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ResultDeleteTestimonialModal from "./ResultDeleteTestimonialModal";

import deleteDepoimento from "../../services/comentario/depoimentoDelete.js";

function DeleteTestimonialModal(props) {
  const [
    resultDeleteTestimonialModalShow,
    setResultDeleteTestimonialModalShow,
  ] = useState(false);

  const [result, setResult] = useState("");

  async function handleDelete() {
    const id = props.testimonialId;
    const res = await deleteDepoimento(id);
    setResult(res);
    setResultDeleteTestimonialModalShow(true);
  }

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Excluir depoimento</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Você tem certeza de que deseja excluir esse depoimento? Essa ação não
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
              handleDelete();
              props.onHide();
            }}
          >
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>

      <ResultDeleteTestimonialModal
        show={resultDeleteTestimonialModalShow}
        onHide={() => setResultDeleteTestimonialModalShow(false)}
        result={result}
      />
    </>
  );
}

export default DeleteTestimonialModal;
