import { Modal, Button } from "react-bootstrap";
import CardComponent from "../Card/Card";
import CommentsCard from "../CommentsCard/CommentsCard";
import { useNavigate, Link } from "react-router-dom";


function VisualizeComment( props ) {
  return (
    <Modal {...props} centered animation={false}>
      <>
        <Modal.Header closeButton={false}>
          {/* <Modal.Title>Visualizar comentario</Modal.Title> */}
        </Modal.Header>

       
        <Modal.Body>
          <div
          style={
            {
              display: 'flex',
              justifyContent: 'center',
            }
          }
          >
            <CardComponent
              key={props?.comment?.produto?.id}
              img={props?.comment?.produto?.imagemUrl}
              title={props?.comment?.produto?.nome}
              author={props?.comment?.produto?.autor}
              rating={props?.comment?.produto?.rating}
              avalationSums={props?.comment?.produto?.somatoriaAvaliacoes}
              avaliationsQuantity={props?.comment?.produto?.quantidadeAvaliacoes}
              price={props?.comment?.produto?.preco}
              sold={props?.comment?.produto?.volumeVendas}
              onClick={() => {
            
              }}
            />
          </div>
        </Modal.Body>

        <Modal.Body
        style={
          {
            display: 'flex',
            justifyContent: 'center',
          }
        }
        >

          <div
          style={
            {
              display: 'flex',
              justifyContent: 'center',
            }
          }
          >
            <CommentsCard
                style={
                  {
                    display: 'flex',
                    justifyContent: 'center',
                  }
                }
                img={props?.comment?.user.imagemUrl}
                author={props?.comment?.user.name}
                text={props?.comment?.comentario}
                onClick={() =>
                  console.log("Clicou no card de ID:", props?.comment?.id)
                }
              />
          </div>
        </Modal.Body>


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

export default VisualizeComment;
