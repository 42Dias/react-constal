import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Alert } from "react-bootstrap";
import ResultCreateCourseModal from "./ResultCreateCourseModal";

import MaskedInput from "react-maskedinput";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import cartaoCreate from "../../services/cartao/cartaoCreate";
import { id } from "../../services/api";
import { useCreditCard } from "../../contexts/CreditCardContext";
import { ContentFormNew } from "../../pages/MyPaymentInfo/styles";

function AddCreditCardModal(props) {
  const { getCreditCards, creditCardList, addCreditCard, deleteCreditCart } = useCreditCard();

  // const [resultAddCreditCard, setResultAddCreditCard] = useState(false);
  // const [submited, isSubmited] = useState(false);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const { result, ...rest } = props;

  async function handleSubmit() {
    /*
    There's missed from this page:
    'tipo',
    'nomeTitular',
    'apelido',
    'bandeira',          
    'importHash',
    */


    const data = {
      apelido:     nickname,
      numero:      number,
      nomeTitular: name,
      validade:    expiry,
      cvv:         cvc,
    };

    let newCartao = await addCreditCard(data)
    console.log(newCartao)
    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    // isSubmited(false);
    props.onHide();
    // window.location.reload()
  }

  useEffect(() => {
    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    // isSubmited(false);
  }, []);

  return (
    <>
      <Modal {...rest} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar cartão</Modal.Title>
        </Modal.Header>
        <Form
          // action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Modal.Body>
            <div>
              <Cards
                className="credit-card"
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focus}
              />
            </div>
            <div>
            <Form.Group className="mb-3">
                <ContentFormNew>
                  <Form.Label column sm="2">
                    Apelido
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apelido do Cartão"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    // onFocus={(_) => setFocus("name")}
                    required
                  />
                </ContentFormNew>
            </Form.Group>

              <Form.Group className="mb-3">
                <ContentFormNew>
                  <Form.Label column sm="2">
                    Número
                  </Form.Label>
                  <MaskedInput
                    className="masked-input"
                    type="tel"
                    name="cardNumber"
                    mask="1111111111111111"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onFocus={(_) => setFocus("number")}
                    required
                  />
                </ContentFormNew>
              </Form.Group>

              <Form.Group className="mb-3">
                <ContentFormNew>
                  <Form.Label column sm="2">
                    Nome
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome no cartão"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(_) => setFocus("name")}
                    required
                  />
                </ContentFormNew>
              </Form.Group>
              <Form.Group className="mb-3">
                <ContentFormNew>
                  <Form.Label column sm="2">
                    Validade
                  </Form.Label>
                  <MaskedInput
                    className="masked-input"
                    type="tel"
                    name="cardExpiry"
                    mask="11/11"
                    value={expiry}
                    onChange={(e) => {
                      setExpiry(e.target.value);
                    }}
                    onFocus={(_) => setFocus("expiry")}
                    required
                  />
                </ContentFormNew>
              </Form.Group>
              <Form.Group className="mb-3">
                <ContentFormNew>
                  <Form.Label column sm="2">
                    CVC
                  </Form.Label>
                  <MaskedInput
                    className="masked-input"
                    type="tel"
                    name="cardCvc"
                    mask="111"
                    value={cvc}
                    onChange={(e) => {
                      setCvc(e.target.value);
                    }}
                    onFocus={(_) => setFocus("cvc")}
                    required
                  />
                </ContentFormNew>
              </Form.Group>
            </div>
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
    </>
  );
}

export default AddCreditCardModal;
