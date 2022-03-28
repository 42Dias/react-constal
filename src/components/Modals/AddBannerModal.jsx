import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
// import bannerCreate from "../../services/banner/bannerCreate";
import uploadImage from "../../services/imagem/upload";
// import ResultCreateCourseModal from "./ResultCreateCourseModal";

import { useBanner } from "../../contexts/BannerContext";


function AddBannerModal(props) {
  const { allBanners, createBanners } = useBanner();

  const { result, ...rest } = props;

  const [imgFile, setImgFile] = useState({});
  const [imgTitle, setImgTitle] = useState("");
  const [imgDesc, setImgDesc]   = useState("");
  const [imgStatus, setImgStatus] = useState(false);

  async function handleSubmit() {
    const data = {
      imagemUrl: imgFile,
      titulo: imgTitle,
      descricao: imgDesc,
      status: imgStatus,
    };

    await createBanners(data)

    setImgFile({});
    setImgTitle("");
    setImgStatus(false);
    props.onHide();
  }

  useEffect(() => {
    setImgFile({});
    setImgTitle("");
    setImgStatus(false);
  }, []);

  async function handleUploadImage(image){
    if (image.type.includes('image')) {
      
      uploadImage(image, setImgFile)

    }
    else {
      toast.error('Arquivo inválido!')
    }
  }

  return (
    <>
      <Modal {...rest} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar banner</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Modal.Body>
            <div>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label column sm="2">
                  Imagem
                </Form.Label>
                <Form.Control
                  type="file"
                  required
                  onChange={(e) => {
                    handleUploadImage(e.target.files[0])
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label column sm="2">
                  Título
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Título"
                  onChange={(e) => setImgTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label column sm="2">
                  Descrição
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descrição"
                  onChange={(e) => setImgDesc(e.target.value)}
                  required
                />
              </Form.Group>


              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label column sm="2">
                  Status
                </Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Ativo"
                  onChange={(e) => setImgStatus(!imgStatus)}
                />
              </Form.Group> */}
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

export default AddBannerModal;
