import React, { useState, useEffect } from "react";

import "react-credit-cards/es/styles-compiled.css";

import "./MyPaymentInfo.styles.css";

import AddCreditCardModal from    "../../components/Modals/AddCreditCardModal";
import DeleteCreditCardModal from "../../components/Modals/DeleteCreditCardModal";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Cards from "react-credit-cards";
import cartaoLoadFilter from "../../services/cartao/cartaoLoadFilter";
import { id } from "../../services/api";
import { useCreditCard } from "../../contexts/CreditCardContext";


import {
  CardProfile,
  CardDatas,
  Title,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
  ModalContainerVendedor,
  ModalFlex,
  ModalContent,
  ContentFormNew,
  LinkHolder,
  Btn,
} from "./styles";
import Header from "../../components/Header";
import { Menu } from "../../components/Menu";



function MyPaymentInfo() {

  const { getCreditCards, creditCardList, addCreditCard, deleteCreditCart } = useCreditCard();

  const [addCreditCardModalShow, setAddCreditCardModalShow] = useState(false);
  const [deleteCreditCardModalShow, setDeleteCreditCardModalShow] = useState(false);

  const [showCvc, setShowCvc] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [creditCardsList, setCerditCardsList] = useState([]);
  const [cardId, setCardId] = useState("");

  const [result, setResult] = useState({
    operation: "",
    status: "",
  });

  async function getCards() {
      let userCartoes = await creditCardList

      console.log(creditCardList)
      setCerditCardsList(userCartoes);
    };
  

  // const getDeleteResult = (result) => {
  //   return setResult({
  //     operation: "del",
  //     status: result.toString(),
  //   });
  // };

  const getAddResult = (result) => {
    return setResult({
      operation: "add",
      status: result.toString(),
    });
  };

  // getCreditCards();


  useEffect(() => {
    getCards()
  }, [creditCardList]);

  
  // useEffect(() => {
  //   setTimeout(() => {
  //     setResult({
  //       operation: "",
  //       status: "",
  //     });
  //   }, 6000);
  // }, [result]);

  return (
    <>
      <Header />
      <Menu />
      <Container style={{ height: "auto" }}>
        <div className="container">
        <Title>
          Meus Cartões
        </Title>
          <CardDatailsContent>
            <Row>
                <h3>Minhas Formas de Pagamento</h3>
                <p>Vizualize suas formas de pagamento cadastradas</p>
            </Row>
          </CardDatailsContent>

          <Btn
            onClick={() => {
              setAddCreditCardModalShow(true);
            }}
          >
            Adicionar Cartão
          </Btn>
        </div>

        <div className="container">
          {/* <CardDatailsContent>
            <Row>
              <h3>Cartões Cadastrados</h3>
              <p>Gerencie seus cartões de crédito cadastrados</p>
            </Row>
          </CardDatailsContent> */}


          <CardDatailsContent>
            <Row>
                <h3>Meus Cartões Cadastrados</h3>
                <p>Vizualize suas formas de pagamento cadastradas</p>
            </Row>
          </CardDatailsContent>
          
        </div>


        
        {
        result.operation && (
          <div className="container-item">
            {result.operation === "add" && (
              <Alert variant={result.status === "201" ? "success" : "danger"}>
                {result.status === "201"
                  ? "Seu cartão foi registrado com sucesso!"
                  : "Ops! Ocorreu um erro ao resgistrar seu cartão. Tente novamente."}
              </Alert>
            )}

            {result.operation === "del" && (
              <Alert variant={result.status === "200" ? "success" : "danger"}>
                {result.status === "200"
                  ? "Seu cartão foi removido com sucesso!"
                  : "Ops! Ocorreu um erro ao remover seu cartão. Tente novamente."}
              </Alert>
            )}
          </div>
        )}
        <div className="credit-card-container">
          <div>
            {
            creditCardsList ==  creditCardList ? (

            creditCardsList?.map((c, id) => {
              return (
                <div key={id} className="card-box">
                  <div
                    onClick={() => {
                      setShowCvc(!showCvc);
                      setCardNumber(c.number);
                    }}
                  >
                    <Cards
                      id="credit-card"
                      number={c.numero}
                      name={c.nomeTitular}
                      expiry={c.validade}
                      cvc={c.cvv}
                      focused={
                        showCvc && cardNumber === c.number ? "cvc" : null
                      }
                    />
                  </div>

                  <div>
                    <Btn
                      className="btn-del"
                      onClick={() => {
                        setCardId(c.id);
                        setDeleteCreditCardModalShow(true);
                      }}
                    >
                      Excluir
                    </Btn>
                  </div>
                </div>
              )
            })  
            ):(
              

              creditCardsList?.map((c, id) => {
                return (
                  <div key={id} className="card-box">
                    <div
                      onClick={() => {
                        setShowCvc(!showCvc);
                        setCardNumber(c.number);
                      }}
                    >
                      <Cards
                        id="credit-card"
                        number={c.numero}
                        name={c.nomeTitular}
                        expiry={c.validade}
                        cvc={c.cvv}
                        focused={
                          showCvc && cardNumber === c.number ? "cvc" : null
                        }
                      />
                    </div>
  
                    <div>
                      <Btn
                        className="btn-del"
                        onClick={() => {
                          setCardId(c.id);
                          setDeleteCreditCardModalShow(true);
                        }}
                      >
                        Excluir
                      </Btn>
                    </div>
                  </div>
                )
              }) 

            )
          }
          </div>
        </div>
      </Container>

      <AddCreditCardModal
        show={addCreditCardModalShow}
        onHide={() => setAddCreditCardModalShow(false)}
        result={getAddResult}
      />
      <DeleteCreditCardModal
        show={deleteCreditCardModalShow}
        onHide={() => setDeleteCreditCardModalShow(false)}
        // result={getDeleteResult}
        id={cardId}
      />
    </>
  );
}

export default MyPaymentInfo;
