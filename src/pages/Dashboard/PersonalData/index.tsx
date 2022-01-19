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
import { Field, Form, Formik } from "formik";

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
  const [bancos, setBancos]=useState<any>([]);  

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
  const [banco, setBanco]=useState<any>();
  const [tipoDeConta, setTipoDeConta]=useState<any>();
  const [numeroCartao, setNumeroCartao]=useState<any>('');
  const [cartaoAgencia, setCartaoAgencia] = useState<any>();

  const [bairro, setBairro] = useState('')
  const [pix, setPix] = useState('')
  const [showModalResetSenha, setShowModalResetSenha] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState("");


  const [formatCartao, setFormatCartao] = useState("99999999-D");
  const [formatAgencia, setFormatAgencia] = useState("9999-D");


    useEffect(
      
      () => {
        console.log(role +" "+ status)
        if(!role){
          //window.location.reload()
        }
        else{
          if(role !== "admin" && role !== "empresa"){
            // Simulate an HTTP redirect:
            window.location.replace(`${ip}/#/erro`);
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
            setNumeroCartao(response.cartaoNumero)
            setTipoDeConta(response.cartaoTipo)
            setBanco(response.cartaoBanco)
            setCartaoAgencia(response.cartaoAgencia)
        }
        loadData()
        setBancos(['Itaú', 'Bradesco', 'Caixa Econômica', 'Banco do Brasil', 'Santander', 'Banrisul', 'Sicredi', 'Sicoob', 'Inter', 'BRB', 'Via Credi', 'Neon', 'Votorantim', 'Nubank', 'Pagseguro', 'Banco Original', 'Safra', 'Modal', 'Banestes','Unicred','Money Plus','Mercantil do Brasil','JP Morgan','Gerencianet Pagamentos do Brasil', 'Banco C6', 'BS2', 'Banco Topazio', 'Uniprime', 'Stone', 'Banco Daycoval', 'Rendimento', 'Banco do Nordeste', 'Citibank', 'PJBank', 'Cooperativa Central de Credito Noroeste Brasileiro', 'Uniprime Norte do Paraná', 'Global SCM', 'Next', 'Cora', 'Mercado Pago', 'Banco da Amazonia', 'BNP Paribas Brasil', 'Juno','Cresol','BRL Trust DTVM','Banco Banese','Banco BTG Pactual','Banco Omni','Acesso Soluções de Pagamento','CCR de São Miguel do Oeste','Polocred','Ótimo']
        )
      }
      , []
    )
    

  async function criarOuAtualizarEmpresa() {
    setLoading(true)
    const data = {
      data: {
        nome : nome, 
        marca : marca,
        email: email,
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
        cartaoTipo: tipoDeConta,
        cartaoNumero: numeroCartao,
        cartaoBanco: banco,
        cartaoAgencia: cartaoAgencia, 
        pix : pix,
        status : "pendente",
      }
    }
    console.log(data)

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
  function checkAccountType(accountType: any) {


switch (accountType) {
  /*
  Banco	Agência	Conta
  Banco do Brasil	9999-D	99999999-D
  */
  case 'Santander':
  case 'Pagseguro':
  case 'Safra':
  case 'Banestes':
  case 'Unicred':
  case 'Gerencianet Pagamentos do Brasil':
  case 'Mercantil do Brasil':
  case 'Banco C6':
  case 'Picpay':
  case "Banco do Brasil":
    setFormatAgencia('9999')
    setFormatCartao('99999999-D')
    break;

  case "Banco do Brasil":
  case 'Sicoob'	:                          
  case 'Itaú'	:                            
  case 'Banpará'	:                          
  case 'Inter'	:                            
  case 'BRB'	:                              
  case 'Neon/Votorantim' :
  case 'Modal'	:         
    setFormatAgencia('9999')
    setFormatCartao('999999999-D')
    break;

  case 'Bradesco'	:                          
  case 'Next'	:              
    setFormatAgencia('9999-D')
    setFormatCartao('9999999-D')
    break;


  case 'Nubank':                          
  case 'PJBank':
  case 'Mercado Pago':                          
  case 'Juno':              	
    setFormatAgencia('9999')
    setFormatCartao('9999999999-D')
    break;
    
  case 'Banco Original' :
  case 'BS2' :
  case 'Stone' :
  case 'Cooperativa Central de Credito Noroeste Brasileiro' :
  case 'Cora' :       
    setFormatAgencia('9999')
    setFormatCartao('9999999-D')
    break;

  
  case 'Via Credi':
  case 'JP Morgan':
    setFormatAgencia('9999')
    setFormatCartao('99999999999-D')
    break;

  case 'Uniprime':
  case 'Banco Genial':
    setFormatAgencia('9999')
    setFormatCartao('9999-D')
    break;

  case 'Uniprime Norte do Paraná':
  case 'Banco da Amazonia':
  case 'Banco Daycoval':
  case 'Banco Omni':
  case 'Polocred':	
    setFormatAgencia('9999')
    setFormatCartao('999999-D')
    break;

  case 'Banco do Nordeste':	
  case 'BRL Trust DTVM':	  
    setFormatAgencia('999')
    setFormatCartao('999999-D')
    break;
  
  case 'Caixa Econômica':	  
      setFormatAgencia('9999')
      setFormatCartao('XXXX999999999-D (X: Operação - Novo formato CP)')
      break;

  case 'Agibank':	  
      setFormatAgencia('9999')
      setFormatCartao('9999999999')
      break;

  case 'Agibank':	  
      setFormatAgencia('9999')
      setFormatCartao('999999D')
      break;

  case 'Money Plus':	  
      setFormatAgencia('9')
      setFormatCartao('99999999-D')
      break;

  case 'Rendimento':	  
      setFormatAgencia('9999-D')
      setFormatCartao('9999999999')
      break;

  case 'Citibank':	  
      setFormatAgencia('9999')
      setFormatCartao('99999999')
      break;

  case 'Citibank':	  
      setFormatAgencia('9999')
      setFormatCartao('99999999999')
      break;

  case 'BNP Paribas Brasil':	  
      setFormatAgencia('999')
      setFormatCartao('999999-DDD')
      break;


  case 'Cresol':	  
      setFormatAgencia('9999-D')
      setFormatCartao('99999-D')
      break;


  case 'Banco Banese':	  
      setFormatAgencia('999')
      setFormatCartao('99999999-D')
      break;


  case 'Acesso Soluções de pagamento':	  
      setFormatAgencia('9999')
      setFormatCartao('99999999')
      break;

  case 'CCR de São Miguel do Oeste':	  
      setFormatAgencia('9999')
      setFormatCartao('99999')
      break;

  case 'Banco Capital S.A':	  
      setFormatAgencia('9999')
      setFormatCartao('999999999')
      break;

  case 'Caixa Econômica':	  
      setFormatAgencia('9999')
      setFormatCartao('XXX99999999-D (X: Operação)')
      break;
  
  } 
  }
  
  function onSubmitInput (values: any, actions: any) {
    // console.log(data)
    // Cadastro(data)
    console.log('SUBMIT', values)
  }

  function onBlurCep (ev: any, setFieldValue: any) {
    const { value } = ev.target

    const cep = value?.replace(/[^0-9]/g, '')

    if (cep?.length !== 8) {
      return
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setLogradouro(data.logradouro)
        setBairro(data.bairro)
        setCidade(data.localidade)
        setEstado(data.uf)
      })
  }
  type FormData = {
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    cep: string;
    uf: string;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    values: string;
    actions: string;
    ev: any;
    setFieldValue: any;
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
              <h3>Ramal: <span>{ramal}</span></h3>
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
                    <label htmlFor="">Ramal</label>
                    <input type="text" placeholder="Ramal"
                    value={ramal}

                    onChange={(text) => setRamal(text.target.value)}
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
                    <label htmlFor="">Website</label>
                    <input type="text" placeholder="Website"
                    value={website}


                    onChange={(text) => setWebsite(text.target.value)}
                    />
                    </ContentFormNew>

                  <ContentFormNew>
                  <label htmlFor="">Seu Banco</label>
                  <select onChange={(text) => {
                    setBanco(text.target.value); 
                    checkAccountType(text.target.value)
                                      }}>
                    {bancos.map((banco: any) => (
                      <option value={banco}>{banco}</option>
                    ))}
                  </select>
                </ContentFormNew>


                <ContentFormNew>
                  <label htmlFor="">Tipo De Conta</label>
                    
                  <select onChange={(text) => {
                    setTipoDeConta(text.target.value);
                    console.log(text.target.value)
                    }}>
                  <option value='Poupança'>Conta Poupança</option>
                  <option value='Corrente'>Conta Corrente</option>
                  
                  
                  </select>

                </ContentFormNew>

                <ContentFormNew>
                    <label htmlFor="">Numero do cartão</label>
                    <p>
                    Formato do Cartão <br />
                    {formatCartao}
                    </p>
                    <input type="text" placeholder={formatCartao}
                    
                    maxLength={10} 
                     
                    value={numeroCartao}

                    onChange={(text) => {
                      setNumeroCartao(text.target.value)
                      console.log("numero do cartão:")
                      console.log(text.target.value)
                      console.log(numeroCartao)
                    }}
                    />
                </ContentFormNew>
                
                <ContentFormNew>
                  <label htmlFor="">Agência</label>
                  <p>
                    Formato da Agência <br />
                    {formatAgencia}
                  </p>
                  <input type="text" 
                    placeholder={formatAgencia}
                    maxLength={10} 
                     
                    value={cartaoAgencia}

                    onChange={(text) => setCartaoAgencia(text.target.value)}
                    />

                </ContentFormNew>


{/* 
                    
                    value={logradouro}
                    value={numero}
                    value={complemento}
                    value={pontoReferencia}
                    value={cidade}
                    value={estado}
                    value={bairro}



*/}


                    <ContentFormNew>
                    <label htmlFor="">Pix</label>
                    <input type="text" placeholder="Pix"
                    value={pix}

                    onChange={(text) => setPix(text.target.value)}
                    />

                    <ContentFormNew>

                    <ContentFormNew>
                    <Formik
                onSubmit={onSubmitInput}
                validateOnMount
                initialValues={{
                  cep: '',
                  logradouro: '',
                  numero: '',
                  complemento: '',
                  bairro: '',
                  cidade: '',
                  uf: '',
                }}
                render={({ isValid, setFieldValue }) => (
                  <Form>
                    
                    <ContentFormNew className='form-control-group'>
                      <label>Cep</label>
                      <Field
                      value={cep}
                        name='cep' type='text'
                        onBlur={(ev: any) => onBlurCep(ev, setFieldValue)}
                        onChange={(text: any) => setCep(text.target.value)}
                        />
                        
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Logradouro</label>
                      <Field 
                      value={logradouro}
                      name='logradouro'
                      type='text'
                      onChange={(text: any) => setLogradouro(text.target.value)} />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Número</label>
                      <Field 
                      value={numero}
                      name='numero' 
                      type='text'
                      onChange={(text: any) => setNumero(text.target.value)}
                       />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Complemento</label>
                      <Field 
                      value={complemento}
                      name='complemento' 
                      type='text'
                      onChange={(text: any) => setComplemento(text.target.value)}
                       />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Bairro</label>
                      <Field 
                      value={bairro}
                      name='bairro' 
                      type='text'
                      onChange={(text: any) => setBairro(text.target.value)}
                       />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Cidade</label>
                      <Field 
                      value={cidade}
                      name='cidade' 
                      type='text'
                      onChange={(text: any) => setCidade(text.target.value)}
                       />
                    </ContentFormNew>

                    <ContentFormNew className='form-control-group'>
                      <label>Estado</label>
                      <Field 
                      value={estado}
                      component='select' 
                      name='uf'
                      onChange={(text: any) => setEstado(text.target.value)}
                      >
                        <option value=''>Selecione o Estado</option>
                        <option value='AC'>Acre</option>
                        <option value='AL'>Alagoas</option>
                        <option value='AP'>Amapá</option>
                        <option value='AM'>Amazonas</option>
                        <option value='BA'>Bahia</option>
                        <option value='CE'>Ceará</option>
                        <option value='DF'>Distrito Federal</option>
                        <option value='ES'>Espírito Santo</option>
                        <option value='GO'>Goiás</option>
                        <option value='MA'>Maranhão</option>
                        <option value='MT'>Mato Grosso</option>
                        <option value='MS'>Mato Grosso do Sul</option>
                        <option value='MG'>Minas Gerais</option>
                        <option value='PA'>Pará</option>
                        <option value='PB'>Paraíba</option>
                        <option value='PR'>Paraná</option>
                        <option value='PE'>Pernambuco</option>
                        <option value='PI'>Piauí</option>
                        <option value='RJ'>Rio de Janeiro</option>
                        <option value='RN'>Rio Grande do Norte</option>
                        <option value='RS'>Rio Grande do Sul</option>
                        <option value='RO'>Rondônia</option>
                        <option value='RR'>Roraima</option>
                        <option value='SC'>Santa Catarina</option>
                        <option value='SP'>São Paulo</option>
                        <option value='SE'>Sergipe</option>
                        <option value='TO'>Tocantins</option>
                      </Field>
                    </ContentFormNew>
                  </Form>
                )}
              />
                    </ContentFormNew>
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
