import { createContext, useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import { useCoursePage } from "../../services/Hooks/CoursePageHook";
import ResultCreateCourseModal from "./ResultCreateCourseModal";
import { toast } from "react-toastify"
import uploadImage from "../../services/imagem/upload";

import IntlCurrencyInput from "react-intl-currency-input"

import '../../index.css'

import currencyConfig from "../../utils/currenryConfig";

import cursoCreate from "../../services/curso/cursoCreate";
import loadCategorias from "../../services/categoria/loadCategorias";

function CreateCourseModal(props) {
  // const [resultCreateCourseModalShow, setResultCreateCourseModalShow] =
  //   useState(false);

  // const [image,                   setImage       ]      = useState("");
  // const [title,                   setTitle       ]      = useState("");
  // const [author,                  setAuthor      ]      = useState("");
  // const [price,                   setPrice       ]      = useState("");
  // const [category,                setCategory    ]      = useState("");
  // const [description,             setDescription ]      = useState("");
  // const [videosErrors,            setVideosErrors]      = useState([]);
  // const [videos,                  setVideos      ]      = useState([]);
  const [handleChangePrice,       setHandleChangePrice] = useState();
  const [categorias,              setCategorias  ]      = useState([]);
  const [newVideo,                setNewVideo    ] = useState();



  // const [videosList, setVideosList] = useState([]);

  // const [course, setCourse] = useState({});

  useEffect(() => { }, []);
  
  const {
    createCourse,
    result,
    setResult,
    setImage,
    image,
    setTitle,
    title,
    setAuthor,
    author,
    setPrice,
    price,
    setCategory,
    category,
    setDescription,
    description,
    setVideos,
    setVideosErrors,
    videosList,
    setVideosList,
    course,
    setCourse,
    resultCreateCourseModalShow,
    setResultCreateCourseModalShow,
  } = useCoursePage();

  // useEffect(() => {
  //   console.log(image);
  // }, [setImage]);

  function handleAddVideos(pathToVideo, imageName) {
    let data = {
      url:   pathToVideo,
      ordem: videosList.length,
      nome:  imageName,
    }
    console.log(data)
    console.log(data.ordem)

    setVideosList((prevData) => {
      return [...new Set( [ ...prevData, data  ] )]	
     } );
  }

  async function handleUploadImage(image){
    if (image.type.includes('image')) {
      
      uploadImage(image, setImage)

    }
    else {
      toast.error('Arquivo inválido!')
    }
  }

  async function handleUploadVideo(image){
    if (image.type.includes('mp4')) {

      console.log("image")
      console.log(image.name)
      let videoPath = await uploadImage(image, setNewVideo)

      handleAddVideos(videoPath, image.name);

    }
    else {
      toast.error('Arquivo inválido!')
    }
  }

  const handleChangePriceOfProduct = (event, value, maskedValue) => {
    event.preventDefault();

    setPrice(value);                   // value without mask (ex: 1234.56)
    setHandleChangePrice(maskedValue); // masked value (ex: R$1234,56)
  };

  async function getCategories(){
    try {
      let categories = await loadCategorias();
      setCategorias(categories)
      setCategory(categories[0].id)
    }
    
    catch (error) {
      console.log(error);
    }
  }

  useEffect(
    () => {

      getCategories()
    },[]
  )

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header
          closeButton
          onClick={() => {
            setVideosErrors();
            setVideosList();
          }}
        >
          <Modal.Title>Adicionar curso</Modal.Title>
        </Modal.Header>
        <Form
          encType="nultipart/form-data"
          action="submit"
          onSubmit={
            async (e) => {
            e.preventDefault()
            if(await createCourse() == 'ok'){
              props.onHide()
            }
          }
        }
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Título
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Título"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Categoria
              </Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {
                  categorias.map(
                    (category) => (
                      <option key={category.id} value={category.id}>
                        {category.nome}
                      </option>
                    )
                  )
                }

              </Form.Control>
              
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Autor
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Autor"
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Preço
              </Form.Label>
              
              <IntlCurrencyInput 
                  className="currencyInput"
                  currency="BRL" 
                  config={currencyConfig}
                  onChange={handleChangePriceOfProduct} 
                  value={handleChangePrice}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label column sm="2">
                Descrição
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descrição"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Imagem
              </Form.Label>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  name="courseImage"
                  type="file"
                  required
                  onChange={(e) => {
                    handleUploadImage(e.target.files[0])
                  }}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label column sm="4">
                Adicionar vídeo
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                required
                onChange={async (e) => {
                  let video = e.target.files[0]
                  console.log(video)
                  console.log(video);
                  await handleUploadVideo(video)
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Vídeos selecionados:</Form.Label>

              {videosList?.length > 0
                ? videosList.map((video, id) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      label={video.nome}
                      key={id}
                      checked
                      onChange={() => console.log(video.nome)}
                    />
                  );
                })
                : 
                ( <p> Nenhum vídeo adicionado </p> ) 
              }
            </Form.Group>

            {/* {videosErrors?.length ? (
              <Alert variant="danger">
                Os seguintes arquivos não puderam ser carregados pois não
                possuem a extensão <strong>mp4</strong>
                <br />
                <br />
                <ul>
                  {videosErrors.map((val, id) => {
                    return <li key={id}>{val.name}</li>;
                  })}
                </ul>
              </Alert>
            ) : (
              ""
            )} */}
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
                setVideosErrors([]);
                // setVideosList();
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
      {/* <ResultCreateCourseModal
        show={resultCreateCourseModalShow}
        onHide={() => setResultCreateCourseModalShow(false)}
        course={course}
        result={result}
      /> */}
    </>
  );
}

export default CreateCourseModal;
