import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import ResultDeleteCategoryModal from "./ResultDeleteCategoryModal";

import { useCategory } from "../../contexts/CategoryContext";

function DeleteCategoryModal(props) {
  const { deleteCategory } = useCategory();
  
  
  // console.log("props")
  // console.log(props)

  const [result, setResult] = useState("");
  const [showResultModal, isShowResultModal] = useState(false);

  async function handleSubmit() {
    //* APENAS PARA DESENVOLVIMENTO ------>
    const id = props.category;

    try {
      await deleteCategory(id)
    }
    catch (error) {
      console.error(error);
    }
    //* APENAS PARA DESENVOLVIMENTO ------>
  }
  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Excluir categoria</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Você tem certeza de que deseja excluir essa categoria? Essa ação não
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
              setResult("");
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
              handleSubmit();
              props.onHide();
            }}
          >
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
      <ResultDeleteCategoryModal
        show={showResultModal}
        onHide={() => isShowResultModal(false)}
        result={result}
      />
    </>
  );
}

export default DeleteCategoryModal;
