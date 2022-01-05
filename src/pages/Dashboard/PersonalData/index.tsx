// import React from "react";
// import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { api, Email, id, ip, role, status } from "../../../services/api";
import { ModalContent } from "../../Produto/styles";
import { ModalContainerVendedor } from "../../Profile/styles";
import { ContentFormNew } from "../NewProd/styles";
import { ModalFlex } from "../Promotions/styles";
import Modal from "react-modal";
import {
  Btn,
  // CardProfile,
  // CardDatas,
  // Title,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
  NewBtn,
} from "./styles";
import { toast } from "react-toastify";
import axios from "axios";

export default function PersonalData() {
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setShowModal1(false);
    setShowModal2(false);
  }
  function messageCancel() {
    toast.error('Ah, que pena. o seu produto não foi cadastrado na plataforma. Revise algumas informações :(')
    //setIsOpen(false);
  }

  function messageApprove() {
    toast.info('Eba, recebemos o seu pedido. Ele será revisado e logo estará na plataforma :)')
    //setIsOpen(false);
  }

  const [nome, setNome]=useState('');  
  const [marca, setMarca] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [telefone, setTelefone] = useState('')
  const [celular, setCelular] = useState('')
  const [ramal, setRamal] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [pontoReferencia, setPontoReferencia] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [bairro, setBairro] = useState('')
  const [pix, setPix] = useState('')
  const [showModalResetSenha, setShowModalResetSenha] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState("");

    useEffect(
      
      () => {
        console.log(role +" "+ status)
        if(!role){
          //window.location.reload()
        }
        else{
          if(role !== "admin" && role !== "empresa"){
            // Simulate an HTTP redirect:
            window.location.replace(`dev.42dias.com.br/Clientes/constal/#/erro`);
          }
        }

        async function loadData(){          
            const responseRes = await api.get('empresa-perfil')
            const response = responseRes.data
            console.log(responseRes)

            setNome(response.nome)
            setMarca(response.marca)
            setRazaoSocial(response.razaoSocial)
            setCnpj(response.cnpj)
            setTelefone(response.telefone)
            setCelular(response.celular)
            setRamal(response.ramal)
            setEmail(Email!)
            setWebsite(response.website)
            setCep(response.cep)
            setLogradouro(response.logradouro)
            setNumero(response.numero)
            setComplemento(response.complemento)
            setPontoReferencia(response.pontoReferencia)
            setCidade(response.cidade)
            setEstado(response.estado)
            setBairro(response.bairro)
            setPix(response.pix)
      
        }
        loadData()
      }
      
      , []
    )

  async function criarOuAtualizarEmpresa() {
    setLoading(true)
    const data = {
      data: {
        nome : nome, 
        marca : marca,
        razaoSocial : razaoSocial,
        cnpj : cnpj,
        telefone : telefone,
        celular : celular,
        ramal : ramal,
        website : website,
        cep : cep,
        logradouro : logradouro,
        numero : numero,
        complemento : complemento,
        pontoReferencia : pontoReferencia,
        cidade : cidade,
        estado : estado,
        bairro : bairro,
        pix : pix,
        status : "pendente",
      }
    }

    const response = await api.post('empresa-perfil', data).then(
      (response) => {
        console.log(response)
        if(response.status == 200){
          toast.info('Empresa Criada com sucessso! :)')
          closeModal()
          setLoading(false)

        }
        else{
          toast.error('Algo deu errado :(')
          console.log(response) 
          setLoading(false)

        }
      }
    )
    .catch(
      (response) => {
        if(response.data){
          toast.info(response.data.status)
        }
        else{
          toast.error("Algo deu errado, verifique seus dados ou tente mais tarde")
        }
        setLoading(false)

      }
    )
  
  }
  async function resetSenha(){
    setLoading(true)
    const data = await api.get("user/" + id).then((response) => {
      update(response.data)
      return response.data;
    });
    console.log(data)
    
    async function update(data:any){
      if(data){
        data.password = senha
      const response = await axios.put(`${ip}:8157/api/auth/password-reset/`, {
        token: id,
        password: senha
      }).then((response) => {
        setLoading(false)
        closeModal()
        toast.info("Ação realizada com sucesso")
        return response.data;
      }).catch(error =>{
        toast.error("Link de redefinição de senha inválido ou expirado")
        setLoading(false)
      })
    }
  }
}
  function closeModalResetSenha() {
    setShowModalResetSenha(false);
  }

  async function changePlace(){

    setLoading(true)

    const data = {
      data: {
        cep : cep,
        logradouro : logradouro,
        numero : numero,
        complemento : complemento,
        pontoReferencia : pontoReferencia,
        cidade : cidade,
        estado : estado,
        bairro : bairro,
      }
    }
    console.log("heaha")
    const response = await api.post('empresa-perfil', data)
    .then(
      (response) => {
        console.log(response)
        if(response.status == 200){
          toast.info('Empresa Criada com sucessso! :)')
          closeModal()
          setLoading(false)

        }
        else{
          toast.info('Algo deu errado :(')
          console.log(response) 
          setLoading(false)

        }
      }
    )
    .catch(
      (response) => {
        console.log(response)
        if(response.data){
          toast.info(response.data.status)
        }
        else{
          toast.error("Algo deu errado, verifique seus dados ou tente mais tarde")
        }
        setLoading(false)

      }
    )
  }



  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Dados da conta</h2>
          <CardDatailsContent>
            <ContentDetails>
              <h3>Login: <span>{email || Email}</span></h3>
              
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails> 
              <h3>Senha: <span>******</span></h3>
              
            </ContentDetails>
            <Btn style={ {width: "115px"}  }
             onClick={() => setShowModalResetSenha(true)}
            >Alterar senha</Btn>
          </CardDatailsContent>
        </CardDatails>



        <CardDatails>
        

          
          <h2>{nome}</h2>
        <Btn style={ {width: "170px"}  }
          onClick={
          () => {setShowModal1(true)}
          }>
            {marca || razaoSocial || cnpj || telefone ? 'Alterar seus dados':'Adicionar seus dados'} 
          </Btn>

{
            marca || razaoSocial || cnpj || telefone ? (
          <>
          <CardDatailsContent>
            <ContentDetails>
              <h3>Marca: <span>{marca}</span></h3>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <h3>Razão Social: <span>{razaoSocial}</span></h3>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <h3>CNPJ: <span> {cnpj} </span></h3>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <h3>Telefone: <span> {telefone}</span></h3>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <h3>Celular: <span> {celular}</span></h3>
            </ContentDetails>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <h3>Website: <span> {website} </span></h3>
            </ContentDetails>
          </CardDatailsContent>
          </>    
            ):
            (
            false
              )
          }
          
        </CardDatails>


        <CardDatails>
          <h2>Endereço</h2>
          <CardDatailsContent className="adress">
            <ContentDetails>
              <small>
                <h3>Logradouro: <span>{logradouro}</span></h3>  
                <h3>Referência: <span>{pontoReferencia}</span></h3> 
                <h3>CEP: <span>{cep}</span></h3>
                <h3>Cidade: <span>{cidade}</span></h3> 
              </small>
            </ContentDetails>
              <Btn //estava como link
              onClick={
                () => setShowModal2(true)}
              >
                {logradouro ? 'Alterar':'Adicionar'} 
                </Btn>

          </CardDatailsContent>
        </CardDatails>
      </div>




      {/* 
      ======================MODAIS======================
       */}
      <ModalContainerVendedor>
        {/* MODAL DE ALTERAR TUDO */}
          <Modal
            isOpen={showModal1}
            onAfterOpen={afterOpenModal}
            onRequestClose={() => setShowModal1(false)}
            >
              <div>
                <ModalFlex>
                  <AiOutlineClose onClick={
                    () => setShowModal1(false)} />
                </ModalFlex>
                <ModalContent>
                  <img  alt="" />
                  <h3>
                  {marca || razaoSocial || cnpj || telefone ? 'Alterar seus dados':'Cadastrar seus dados'} 
                    </h3>
                    <ContentFormNew>
                    <label htmlFor="">Nome da Empresa</label>
                    <input type="text" placeholder="Empresa"
                    value={nome}
                    onChange={(text) => setNome(text.target.value)}
                    />
                    </ContentFormNew>
                    <ContentFormNew>
                    <label htmlFor="">Marca</label>
                    <input type="text" placeholder="Marca"
                    value={marca}
                    onChange={(text) => setMarca(text.target.value)}
                    />
                    </ContentFormNew>
                    <ContentFormNew>
                    <label htmlFor="">Razão Social</label>
                    <input type="text" placeholder="Razão Social"
                    value={razaoSocial}

                    onChange={(text) => setRazaoSocial(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Telefone</label>
                    <input type="text" placeholder="Telefone"
                    value={telefone}

                    onChange={(text) => setTelefone(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Celular</label>
                    <input type="text" placeholder="Celular"
                    value={celular}

                    onChange={(text) => setCelular(text.target.value)}
                    />
                    </ContentFormNew>


                    <ContentFormNew>
                    <label htmlFor="">CNPJ</label>
                    <input type="text" placeholder="CNPJ"
                    value={cnpj}

                    onChange={(text) => setCnpj(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Ramal</label>
                    <input type="text" placeholder="Ramal"
                    value={ramal}

                    onChange={(text) => setRamal(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Website</label>
                    <input type="text" placeholder="Website"
                    value={website}


                    onChange={(text) => setWebsite(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Cep</label>
                    <input type="text" placeholder="Cep"
                    value={cep}

                    onChange={(text) => setCep(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Logradouro</label>
                    <input type="text" placeholder="Logradouro"
                    value={logradouro}

                    onChange={(text) => setLogradouro(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Numero</label>
                    <input type="text" placeholder="Numero"
                    value={numero}

                    onChange={(text) => setNumero(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Complemento</label>
                    <input type="text" placeholder="Complemento"
                    value={complemento}

                    onChange={(text) => setComplemento(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Ponto de Referência</label>
                    <input type="text" placeholder="PontoReferencia"
                    value={pontoReferencia}

                    onChange={(text) => setPontoReferencia(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Cidade</label>
                    <input type="text" placeholder="Cidade"
                    value={cidade}

                    onChange={(text) => setCidade(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Estado</label>
                    <input type="text" placeholder="Estado"
                    value={estado}

                    onChange={(text) => setEstado(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Bairro</label>
                    <input type="text" placeholder="Bairro"
                    value={bairro}

                    onChange={(text) => setBairro(text.target.value)}
                    />
                    </ContentFormNew>

                    <ContentFormNew>
                    <label htmlFor="">Pix</label>
                    <input type="text" placeholder="Pix"
                    value={pix}

                    onChange={(text) => setPix(text.target.value)}
                    />

                    <ContentFormNew>
                    {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : false}
                    </ContentFormNew>

                    </ContentFormNew>
                    <NewBtn>
                      <button type="button" onClick={() => setShowModal1(false)}>Cancelar</button>
                      <button type="button" onClick={() => criarOuAtualizarEmpresa()}>Adicionar</button>
                    </NewBtn>
                </ModalContent>
              </div>
          </Modal>
        </ModalContainerVendedor>      

        <ModalContainerVendedor>
        <Modal
          isOpen={showModal2}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose onClick={closeModal} /> 
            </ModalFlex>

            <ModalContent>
              <h3>
              {logradouro ? 'Alterar ':'Adicionar '} 
               endereço</h3>

              <ContentFormNew>
                <label htmlFor="">CEP</label>
                <input type="number" placeholder="CEP"
                value={cep}
                onChange={
                  (text) => setCep(text.target.value)
                } />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Logradouro</label>
                <input type="text" placeholder="Logradouro"
                value={logradouro}

                onChange={
                  (text) => setLogradouro(text.target.value)
                } />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Número</label>
                <input type="number" placeholder="Número"
                value={numero}

                onChange={
                  (text) => setNumero(text.target.value)
                } />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Complemento</label>
                <input type="text" placeholder="Complemento"
                value={complemento}

                onChange={
                  (text) => setComplemento(text.target.value)
                } />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Referência</label>
                <input type="text" placeholder="Referência"
                value={pontoReferencia}

                onChange={
                  (text) => setPontoReferencia(text.target.value)
                } />
              </ContentFormNew> 

              <ContentFormNew>
                <label htmlFor="">Estado</label>
                <input type="text" placeholder="Estado"
                value={estado}

                onChange={
                  (text) => setEstado(text.target.value)
                } />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Cidade</label>
                <input type="text" placeholder="Cidade"
                value={cidade}

                onChange={
                  (text) => setCidade(text.target.value)
                } />
              </ContentFormNew>
              <ContentFormNew>
                    {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : false}
                    </ContentFormNew>
                    
              <NewBtn>
                <button type="button" onClick={messageCancel}>Cancelar</button>
                <button type="button" onClick={changePlace}>Adicionar</button>
              </NewBtn>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
      
 <ModalContainerVendedor>
 <Modal
   isOpen={showModalResetSenha}
   onAfterOpen={afterOpenModal}
   onRequestClose={closeModalResetSenha}
 >
   <div>
     <ModalFlex>
       <AiOutlineClose onClick={closeModalResetSenha} />
     </ModalFlex>

     <ModalContent>
       <h3>Nova Senha</h3>
       <ContentFormNew>
         <label htmlFor="">Senha: </label>
         <input
           type="password"
           onChange={(text) => setSenha(text.target.value)}
         />
       </ContentFormNew>
       <ContentFormNew>
                    {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) : false}
                    </ContentFormNew>
                    
       <div className="buttonsNew">
         <button type="button" onClick={closeModalResetSenha}>
           Cancelar
         </button>
         <button type="button" onClick={resetSenha}>
           Adicionar
         </button>
       </div>
     </ModalContent>
   </div>
 </Modal>
</ModalContainerVendedor>



    </>
  );
}
