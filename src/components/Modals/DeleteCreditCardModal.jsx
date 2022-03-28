import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useCreditCard } from "../../contexts/CreditCardContext";

const axios = require("axios").default;



function DeleteCreditCardModal(props) {
  
  const { getCreditCards, creditCardList, addCreditCard, deleteCreditCart } = useCreditCard();

  const { ...rest } = props;

  async function handleClick(id) {
    await deleteCreditCart(id)

    
  }

  return (
    <>
      <Modal {...rest} centered animation={false}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Excluir cartão</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Você tem certeza de que deseja excluir esse cartão? Essa ação não
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
              handleClick(props.id);
              props.onHide();
            }}
          >
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCreditCardModal;
