import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import cadastrarCategory from "../../services/categoria/cadastrarCategory";
import ResultCreateCategoryModal from "./ResultCreateCategoryModal";

import { useCategory } from "../../contexts/CategoryContext";


function CreateCategoryModal(props) {
  const { allCategorys, createCategorys } = useCategory();
  
  const [showResultModal, isShowResultModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [result, setResult] = useState(null);
  
  async function handleSubmit() {
    try {
      let data = {
        nome: categoryName
      }
      await createCategorys(data)
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setCategoryName("");
  }, []);

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header
          closeButton
          onClick={() => {
            setCategoryName("");
          }}
        >
          <Modal.Title>Adicionar categoria</Modal.Title>
        </Modal.Header>
        <Form
          encType="nultipart/form-data"
          action="submit"
          onSubmit={() => {
            props.onHide();
            setResult(null);
            handleSubmit();
          }}
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Categoria
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Título"
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
              variant="danger"
              onClick={() => {
                props.onHide();
                setCategoryName("");
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
              type="submit"
            >
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ResultCreateCategoryModal
        show={showResultModal}
        onHide={() => isShowResultModal(false)}
        result={result}
      />
    </>
  );
}

export default CreateCategoryModal;
