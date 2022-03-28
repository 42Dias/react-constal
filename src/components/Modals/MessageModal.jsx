import { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";

import ResultMessageModal from "./ResultMessageModal";
import MessageService from "../../services/MessageService";

// TODO - formatar data.videos antes de submeter

function MessageModal(props) {
  const [messageAnswer, setMessageAnswer] = useState("");
  const [messageResultStatus, setMessageResultStatus] = useState(false);
  const [messageResultModalShow, setMessageResultModalShow] = useState(false);
  const [msgAnswered, isMsgAnswered] = useState(false);

  async function handleSubmit() {
    if (!msgAnswered) {
      const body = {
        messageId: props.message.id,
        messageStatus: props.message.status,
        answerContent: messageAnswer,
        userEmail: props.message.userEmail,
      };

      const response = await MessageService.updateMessageStatus(body);
      setMessageResultStatus(response.status === 201 ? true : false);
      isMsgAnswered(false);
    } else {
      console.log("Essa mensagem já foi respondida");
    }
    setMessageAnswer("");
  }

  // async function setStatus() {
  //   const body = {
  //     messageId: props.id,
  //     messageStatus: props.status,
  //   };

  //   console.log(body);
  // }

  useEffect(() => {
    setMessageAnswer("");
    if (props.message.answer) isMsgAnswered(true);
    console.log(props.message.answer);
    // setStatus();
  }, []);

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Mensagem</Modal.Title>
        </Modal.Header>
        <Form
          action="submit"
          onSubmit={() => {
            handleSubmit();
            setMessageAnswer("");
            setMessageResultModalShow(true);
            props.onHide();
          }}
        >
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="10">
                Aluno: {props.message.userName}
              </Form.Label>
              {/* <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={props.message.userName}
                />
              </Col> */}
              <Form.Label column sm="10">
                Curso: {props.message.courseName || "Sem curso"}
              </Form.Label>
              {/* <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={props.message.courseName || "Sem curso"}
                />
              </Col> */}
              <Form.Label column sm="10">
                Data:{" "}
                {new Date(props.message.updatedAt).toLocaleDateString("pt-BR")}
              </Form.Label>
              {/* <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={new Date(
                    props.message.updatedAt
                  ).toLocaleDateString("pt-BR")}
                />
              </Col> */}

              <Form.Label column sm="10">
                Email: {props.message.userEmail}
              </Form.Label>

              <Form.Label column sm="2">
                Mensagem:
              </Form.Label>

              <Form.Text id="passwordHelpBlock" muted>
                {props.message.messageContent}
              </Form.Text>
            </Form.Group>
            <hr />
            {!props.message.answer ? (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label column sm="2">
                  Responder:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  onChange={(e) => setMessageAnswer(e.target.value)}
                />
              </Form.Group>
            ) : (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label column sm="2">
                  Respondido:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  readOnly
                  placeholder={props.message.answer}
                />
              </Form.Group>
            )}
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
                setMessageAnswer("");
              }}
            >
              Cancelar
            </Button>

            {!props.message.answer ? (
              <Button
                type="submit"
                style={{
                  backgroundColor: "#14B8A6",
                  border: "none",
                  boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                }}
              >
                Responder
              </Button>
            ) : (
              <Button
                type="submit"
                disabled
                style={{
                  backgroundColor: "#14B8A6",
                  border: "none",
                  boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                }}
              >
                Responder
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>

      <ResultMessageModal
        show={messageResultModalShow}
        onHide={() => setMessageResultModalShow(false)}
        status={messageResultStatus}
      />
    </>
  );
}

export default MessageModal;
