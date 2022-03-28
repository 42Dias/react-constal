import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import ResultDeleteVideoModal from "./ResultDeleteVideoModal";

function DeleteVideoModal(props) {
  const [resultDeleteVideoModalShow, setResultDeleteVideoModalShow] =
    useState(false);

  function handleClick() {
    console.log(props.video);
  }
  return (
    <>
      <Modal {...props} centered animation={false}>
        <>
          <Modal.Header closeButton={false}>
            <Modal.Title>Deletar video</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Você tem certeza de que deseja deletar o vídeo{" "}
            <strong>{props.video}</strong> ? Essa ação não poderá ser desfeita.
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
              onClick={() => {
                handleClick();
                setResultDeleteVideoModalShow(true);
                props.onHide();
              }}
            >
              Deletar
            </Button>
          </Modal.Footer>
        </>
      </Modal>
      <ResultDeleteVideoModal
        show={resultDeleteVideoModalShow}
        onHide={() => setResultDeleteVideoModalShow(false)}
        video={props.video}
      />
    </>
  );
}

export default DeleteVideoModal;
