// import React from "react";
// import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { api, Email, id, idPessoa, ip, role, status, tenantId, token } from "../../../services/api";
import { ModalContent } from "../../Produto/styles";
import { ModalContainerVendedor } from "../../Profile/styles";
import { ContentFormNew } from "../NewProd/styles";
import { ModalFlex } from "../Promotions/styles";
import Modal from "react-modal";

import { serialize } from 'object-to-formdata';


// @ts-ignore
import InputMask from 'react-input-mask';

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
import { format } from "path";
import { type } from "os";
import integration from "../../../services/integration/integration";


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
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [celular, setCelular] = useState('')
  
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  
  
  const [marca, setMarca] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')
  const [ramal, setRamal] = useState('')
  const [website, setWebsite] = useState('')
  
  const [complemento, setComplemento] = useState('')
  const [pontoReferencia, setPontoReferencia] = useState('')
  
  const [bairro, setBairro] = useState('')
  const [pix, setPix] = useState('')
  const [showModalResetSenha, setShowModalResetSenha] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState("");


  const [formatCartao, setFormatCartao] = useState("99999999-D");
  const [formatAgencia, setFormatAgencia] = useState("9999-D");

  const [maskedTelefone, setMaskedTelefone] = useState();
  const [maskedCelular, setMaskedCelular] = useState();
  const [maskedCNPJ, setMaskedCNPJ] = useState();
  
  const [banco, setBanco]=useState<any>('Itaú');
  
  const [tipoDeConta, setTipoDeConta]=useState<any>('Poupança');
  const [numeroConta, setNumeroConta]=useState<any>('');
  const [agencia, setAgencia] = useState<any>('');
  const [codigoBanco, setCodigoBanco] = useState<any>('');
  const [nomeTitular, setNomeTitular] = useState<any>('');



  const [faturamentoEstimado, setFaturamentoEstimado] = useState<any>('');

  const [agenciaNumero, setAgenciaNumero] = useState<any>('');
  const [bancoDigito  , setBancoDigito  ] = useState<any>('');


  const [nomeProprietario,       setNomeProprietario      ] = useState('');  
  const [sobrenomeProprietario,  setSobreomeProprietario  ] = useState('');  
  const [cpfProprietario,        setCpfProprietario       ] = useState('')
  const [emailProprietario,      setEmailProprietario     ] = useState('')
  const [telefoneProprietario,   setTelefoneProprietario  ] = useState('')
  const [celularProprietario,    setCelularProprietario   ] = useState('')
  
  const [cidadeProprietario,     setCidadeProprietario    ] = useState('')
  const [dataNascProprietario,   setDataNascProprietario  ] = useState('')
  const [estadoProprietario,     setEstadoProprietario    ] = useState('')
  const [cepProprietario,        setCepProprietario       ] = useState('')
  const [bairroProprietario,     setBairroProprietario    ] = useState('')
  const [logradouroProprietario, setLogradouroProprietario] = useState('')
  const [numeroProprietario,     setNumeroProprietario    ] = useState('')



  
  

  function formatarNumero(v: any){
    v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
  function formatarCnpj(v: any){
    return v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  }

    useEffect(
      
      () => {
        // console.log(role +" "+ status)
        if(!role){
          //window.location.reload()
        }
        else{
          if(role !== "admin" && role !== "empresa"){
            // Simulate an HTTP redirect:
            window.location.replace(`${ip}/#/erro`);
          }
          else if(!tenantId && role != undefined){
            window.location.reload()
          }
        }

        async function loadData(){          
            const responseRes = await api.get('empresa-perfil')
            const response = responseRes.data
            // console.log(responseRes)

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
            setMaskedTelefone(formatarNumero(response.telefone))
            setMaskedCNPJ(formatarCnpj(response.cnpj))

            setCodigoBanco(response.codigoBanco)
            setNumeroConta(response.conta)
            setAgencia(response.agencia)
            setAgenciaNumero(response.agenciaDigito)
            setBancoDigito(response.contaDigito)
        }
        loadData()
        setBancos(['Itaú', 'Bradesco', 'Caixa Econômica', 'Banco do Brasil', 'Santander', 'Banrisul', 'Sicredi', 'Sicoob', 'Inter', 'BRB', 'Via Credi', 'Neon', 'Votorantim', 'Nubank', 'Pagseguro', 'Banco Original', 'Safra', 'Modal', 'Banestes','Unicred','Money Plus','Mercantil do Brasil','JP Morgan','Gerencianet Pagamentos do Brasil', 'Banco C6', 'BS2', 'Banco Topazio', 'Uniprime', 'Stone', 'Banco Daycoval', 'Rendimento', 'Banco do Nordeste', 'Citibank', 'PJBank', 'Cooperativa Central de Credito Noroeste Brasileiro', 'Uniprime Norte do Paraná', 'Global SCM', 'Next', 'Cora', 'Mercado Pago', 'Banco da Amazonia', 'BNP Paribas Brasil', 'Juno','Cresol','BRL Trust DTVM','Banco Banese','Banco BTG Pactual','Banco Omni','Acesso Soluções de Pagamento','CCR de São Miguel do Oeste','Polocred','Ótimo']
        )
      }
      , []
    )

    

  async function criarOuAtualizarEmpresa(e: any) {
    e.preventDefault()

    if(loading) return;
    
    setLoading(true)
    try {


    const zspayData =  {
      tipoEstabelecimentoId: 2,
       categoria : 71, 
       nome : nome, 
       nomeComprovante: nome,
       marca : marca,
       email: email,
       razaoSocial : razaoSocial,
       cnpj : cnpj,
       telefone : telefone,
       celular : celular,
       faturamento_estimado: faturamentoEstimado,

       desativarVendas: 0,
       nomeFantasia: nome,

       dataNascimento: '',
       dataNascimento2: '',
       taxpayer_id: 0,


       endereco: {
         logradouro: logradouro,
         numero: numero,
         cidade: cidade,
         estado: estado,
         cep: cep,
         bairro: bairro,
         complemento: complemento,
       },

       proprietario: {
         nome: nomeProprietario,
         sobrenome: sobrenomeProprietario,
         email: emailProprietario,
         celular:  celularProprietario,
         dataNascimento: dataNascProprietario,
         cpf: cpfProprietario,
     
         endereco: {
           logradouro: logradouroProprietario,
           numero: numeroProprietario,
           cidade: cidadeProprietario,
           estado: estadoProprietario,
           cep: cepProprietario,
           bairro: bairroProprietario
         }
       },

       contaBancaria: {
         tipoContaBancaria: "1",
         nomeTitular: nomeTitular,
         agencia: agencia,
         conta: numeroConta,
         bancoId: bancoDigito,
       },


       logo:                   null,
       documentos:             null,
       documentosProprietario: null,
       documentosAtividade:    null,
       documentosResidencia:   null,
       outrosDocumentos:       null,


       enderecoPOS: {
        logradouro: "",
        numero: "",
        cidade: "",
        estado: "",
        cep: "",
        bairro: "",
        complemento: "",
      },

   }
   
   const zspayData2 = getFormData(zspayData)

    const data: any = {
      data: {
        tipoEstabelecimentoId: 2,
        nome : nome, 
        nomeComprovante: nome,
        marca : marca,
        email: email,
        razaoSocial : razaoSocial,
        cnpj : cnpj,
        telefone : telefone,
        celular : celular,
        faturamento_estimado: faturamentoEstimado,

        desativarVendas: "0",
        nomeFantasia: nome,



        endereco: {
          logradouro: logradouro,
          numero: numero,
          cidade: cidade,
          estado: estado,
          cep: cep,
          bairro: bairro,
          complemento: complemento,
        },

        proprietario: {
          nome: nomeProprietario,
          sobrenome: sobrenomeProprietario,
          email: emailProprietario,
          celular:  celularProprietario,
          dataNascimento: dataNascProprietario,
          cpf: cpfProprietario,
      
          endereco: {
            logradouro: logradouroProprietario,
            numero: numeroProprietario,
            cidade: cidadeProprietario,
            estado: estadoProprietario,
            cep: cepProprietario,
            bairro: bairroProprietario
          }
        },

        contaBancaria: {
          tipoContaBancaria: "1",
          nomeTitular: nomeTitular,
          agencia: agencia,
          conta: numeroConta,
          bancoId: bancoDigito,
        },

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
        tipoDeConta: tipoDeConta,
        conta: numeroConta,
        codigoBanco: codigoBanco,
        contaDigito: bancoDigito,
        agenciaDigito: agenciaNumero,
        banco: banco,
        agencia: agencia, 
        pix : pix,
        user : id,
        status : "pendente",
      }
    }


    /*

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
        tipoDeConta: tipoDeConta,
        conta: numeroConta,
        codigoBanco: codigoBanco,
        contaDigito: contaDigito,
        agenciaDigito: agenciaNumero,
        banco: banco,
        agencia: agencia, 
        pix : pix,
        user : id,
        status : "pendente",

        api: {
          
        }


    }
        */

    const isThereEmpresa = await api.get(`empresaUser/${id}`)
    .then(r => r.data)
    .catch(() => setLoading(false) )


    if(isThereEmpresa) {
      setLoading(false)
      return updateEmpresa(isThereEmpresa.id, data)
    }

    const generatedApiData = await integration.create(zspayData2)

    console.log("generatedApiData")
    console.log(generatedApiData)

    if(!generatedApiData) {
      setLoading(false)
      return toast.error("Erro ao criar seus dados no gateway de pagamento, revise-os!")
  }

    data.data.user_token = generatedApiData.estabelecimento.id

    const generatedEmpresa = await api.post('empresa',  data )
    .then(r => r.data)
    .catch(
      (response) => {
        setLoading(false)
        response.data ? toast.info(response.data.status) : toast.error("Algo deu errado, verifique seus dados ou tente mais tarde")
    })

    if(generatedEmpresa){
      toast.info('Empresa Criada com sucessso! :)')
      closeModal()
    }
    closeModal()
    setLoading(false)
  }
  catch(e){
    // toast.error(String(e)) 
    toast.error("Erro ao enviar os dados!")
    
    setLoading(false)
  }
  }
  async function resetSenha(){
    setLoading(true)
    const data = await api.get("user/" + id)
    .then((response) => {
      update(response.data)
      return response.data;
    })
    .catch(() => setLoading(false) )
    // console.log(data)
    
    async function update(data:any){
      if(data){
        data.password = senha
      const response = await axios.put(`${ip}:8157/api/auth/password-reset/`, {
        token: id,
        password: senha
      }).then((response) => {
        closeModal()
        setLoading(false)
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

    if(loading) return;

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
    // console.log("heaha")
    const response = await api.post('empresa-perfil', data)
    .then(
      (response) => {
        // console.log(response)
        if(!response.data.errors){
          toast.info('Empresa Criada com sucessso! :)')
          closeModal()
          setLoading(false)

        }
        else{
          toast.info('Algo deu errado :(')
          // console.log(response.data.errors) 
          setLoading(false)

        }
      }
    )
    .catch(
      (response) => {
        // console.log(response)
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


  async function updateEmpresa(id: string, data: any,){
    let res = await api.put(`empresa/${id}`, data)

    if (res.status != 200) return toast.error("Algo deu errado!")
    
    toast.success("Dados alterados com sucesso")
    closeModal()
    setLoading(false)

  }


  function onSubmitInput (values: any, actions: any) {
    // // console.log(data)
    // Cadastro(data)
    // console.log('SUBMIT', values)
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


   /*transforms a object into formData*/
   function getFormData(object: any) {
   return serialize(object)
}

  useEffect(
    () => {
      let email = localStorage.getItem("email")?.replace(/"/g, "");
      if(email && !role){
              // @ts-ignore
              document.location.reload(true);
      }
    }, []
  )

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
            <Btn style={{ width: "115px" }}
              onClick={() => setShowModalResetSenha(true)}
            >Alterar senha</Btn>
          </CardDatailsContent>
        </CardDatails>
        <CardDatails>



          <h2>{nome}</h2>
          <Btn style={{ width: "170px" }}
            onClick={
              () => { setShowModal1(true) }
            }>
            {marca || razaoSocial || cnpj || telefone ? 'Alterar seus dados' : 'Adicionar seus dados'}
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
                    <h3>CNPJ: <span> {
                      maskedCNPJ
                    } </span></h3>
                  </ContentDetails>
                </CardDatailsContent>

                <CardDatailsContent>
                  <ContentDetails>
                    <h3>Telefone: <span> {
                      maskedTelefone
                    }</span></h3>
                  </ContentDetails>
                </CardDatailsContent>

                <CardDatailsContent>
                  <ContentDetails>
                    <h3>Celular: <span> {celular ? formatarNumero(celular) : false}</span></h3>
                  </ContentDetails>
                </CardDatailsContent>

                <CardDatailsContent>
                  <ContentDetails>
                    <h3>Website:
                      <span>
                        <a
                          style={
                            {
                              backgroundColor: 'transparent',
                              color: 'rgba(0, 0, 0, 0.65)',
                              display: 'inline',
                              fontWeight: 'lighter',
                            }
                          }
                          href={website}
                          target="_blank">
                          {website}
                        </a>
                      </span>
                    </h3>
                  </ContentDetails>
                </CardDatailsContent>
              </>
            ) :
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
                <h3>Logradouro: <span>{logradouro}     </span></h3>
                <h3>Referência: <span>{pontoReferencia}</span></h3>
                <h3>CEP:        <span>{cep}            </span></h3>
                <h3>Cidade:     <span>{cidade}         </span></h3>
              </small>
            </ContentDetails>
            <Btn //estava como link
              onClick={
                () => setShowModal2(true)}
            >
              {logradouro ? 'Alterar' : 'Adicionar'}
            </Btn>

          </CardDatailsContent>
        </CardDatails>
      </div>





      {/* 
      ======================MODAIS======================
       */}
      <ModalContainerVendedor >
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
            <ModalContent
              onSubmit={criarOuAtualizarEmpresa}>
              <img alt="" />
              <h3>
                {marca || razaoSocial || cnpj || telefone ? 'Alterar seus dados' : 'Cadastrar seus dados'}
              </h3>
              <ContentFormNew>
                <label htmlFor="">Nome da Empresa*</label>
                <input
                  required type="text" placeholder="Empresa"
                  value={nome}
                  onChange={(text) => setNome(text.target.value)}
                />
              </ContentFormNew>
              <ContentFormNew>
                <label htmlFor="">Marca</label>
                <input
                  type="text" placeholder="Marca"
                  value={marca}
                  onChange={(text) => setMarca(text.target.value)}
                />
              </ContentFormNew>
              <ContentFormNew>
                <label htmlFor="">Razão Social*</label>
                <input
                  required type="text" placeholder="Razão Social"
                  value={razaoSocial}

                  onChange={(text) => setRazaoSocial(text.target.value)}
                />
              </ContentFormNew>


              <ContentFormNew>
                <label htmlFor="">Ramal</label>
                <input
                  type="text" placeholder="Ramal"
                  value={ramal}

                  onChange={(text) => setRamal(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Telefone*</label>

                <InputMask
                  mask="(99) 9999-9999"
                  value={maskedTelefone}
                  onChange={
                    (e: any) => {
                      let telefone = e.target.value

                      setTelefone(
                        telefone.replace(/[\(\)\.\s-]+/g, '')
                      )
                      setMaskedTelefone(e.target.value)
                    }
                  }
                />
              </ContentFormNew>


              <ContentFormNew>

                <label htmlFor="">Celular</label>

                <InputMask
                  required
                  mask="(99) 9999-99999"
                  value={maskedCelular}
                  onChange={
                    (e: any) => {
                      let celular = e.target.value
                      setCelular(
                        celular.replace(/[\(\)\.\s-]+/g, '')
                      )
                      setMaskedCelular(e.target.value)
                    }
                  }
                />


              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">CNPJ*</label>
                <InputMask
                  required mask="99.999.999/9999-99"
                  value={maskedCNPJ}

                  // 01.161.734/0001-15
                  onChange={
                    (e: any) => {
                      let cnpj = e.target.value
                      setCnpj(
                        cnpj.replace(/\D/g, '')
                      )
                      setMaskedCNPJ(e.target.value)
                    }
                  }
                />
              </ContentFormNew>


              <ContentFormNew>
                <label htmlFor="">Website</label>
                <input
                  type="text" placeholder="Website"
                  value={website}


                  onChange={(text) => setWebsite(text.target.value)}
                />
              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Tipo de Conta*</label>

                <select
                  onChange={
                    (e: any) => setTipoDeConta(e.target.value)}
                >
                  <option value="1">Conta Corrente</option>
                  <option value="2">Conta Poupança</option>


                </select>

              </ContentFormNew>


              <ContentFormNew>
                <label htmlFor="">Conta*</label>

                <InputMask
                  required

                  mask="999999-9"
                  placeholder={'012855-3'}
                  // 01.161.734/0001-15
                  onChange={
                    (e: any) => {
                      let value = e.target.value
                      let formatedValue = value.replace(/\D/g, '')
                      setNumeroConta(formatedValue)
                    }
                  }
                />

              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Agência*</label>

                <InputMask
                  required
                  mask="9999"
                  placeholder={'0590'}
                  defaultValue={agencia}
                  onChange={
                    (e: any) => {
                      let value = e.target.value
                      let formatedValue = value.replace(/\D/g, '')
                      setAgencia(formatedValue)
                    }
                  }
                />

              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Dígito do banco*</label>

                <InputMask
                  required
                  mask="9999"
                  placeholder={'0590'}
                  defaultValue={bancoDigito}
                  onChange={
                    (e: any) => {
                      let value = e.target.value
                      let formatedValue = value.replace(/\D/g, '')
                      setBancoDigito(formatedValue)
                    }
                  }
                />

              </ContentFormNew>


              <ContentFormNew>
                <label htmlFor="">Nome do titular</label>
                <input
                  type="text" placeholder="Nome do titular"
                  value={nomeTitular}

                  onChange={(text) => setNomeTitular(text.target.value)}
                />

              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Faturamento estimado da empresa</label>
                <input
                  type="text" placeholder="Faturamento"
                  value={faturamentoEstimado}

                  onChange={(text) => setFaturamentoEstimado(text.target.value)}
                />

              </ContentFormNew>

              <ContentFormNew>
                <label htmlFor="">Pix</label>
                <input
                  type="text" placeholder="Pix"
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
                            <label>Cep*</label>
                            <Field
                              required
                              value={cep}
                              name='cep' type='text'
                              onBlur={(ev: any) => onBlurCep(ev, setFieldValue)}
                              onChange={(text: any) => setCep(text.target.value)}
                            />

                          </ContentFormNew>

                          <ContentFormNew className='form-control-group'>
                            <label>Logradouro*</label>
                            <Field
                              required
                              value={logradouro}
                              name='logradouro'
                              type='text'
                              onChange={(text: any) => setLogradouro(text.target.value)} />
                          </ContentFormNew>

                          <ContentFormNew className='form-control-group'>
                            <label>Número*</label>
                            <Field
                              required
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
                            <label>Bairro*</label>
                            <Field
                              required
                              value={bairro}
                              name='bairro'
                              type='text'
                              onChange={(text: any) => setBairro(text.target.value)}
                            />
                          </ContentFormNew>

                          <ContentFormNew className='form-control-group'>
                            <label>Cidade*</label>
                            <Field
                              required
                              value={cidade}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setCidade(text.target.value)}
                            />
                          </ContentFormNew>

                          <ContentFormNew className='form-control-group'>
                            <label>Estado*</label>
                            <Field
                              required
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

                        {/* NOT SO NECESSARY AT ALL  */}
                        {/* 
                          <ContentFormNew className='form-control-group'>
                            <label>Nome do proprietário*</label>
                            <Field
                              required
                              value={nomeProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setNomeProprietario(text.target.value)}
                            />
                          </ContentFormNew>


                          <ContentFormNew className='form-control-group'>
                            <label>Sobrenome do proprietário*</label>
                            <Field
                              required
                              value={sobrenomeProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setSobreomeProprietario(text.target.value)}
                            />
                          </ContentFormNew>

                          <ContentFormNew className='form-control-group'>
                            <label>Email do proprietário*</label>
                            <Field
                              required
                              value={emailProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setEmailProprietario(text.target.value)}
                            />
                          </ContentFormNew>

                          <ContentFormNew className='form-control-group'>
                            <label>Celular do proprietário*</label>
                            <Field
                              required
                              value={celularProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setCelularProprietario(text.target.value)}
                            />
                          </ContentFormNew>



                          <ContentFormNew className='form-control-group'>
                            <label>Data de nascimento do proprietário*</label>
                            <Field
                              required
                              value={dataNascProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setDataNascProprietario(text.target.value)}
                            />
                          </ContentFormNew>





                          <ContentFormNew className='form-control-group'>
                            <label>CPF do proprietário*</label>
                            <Field
                              required
                              value={cpfProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setCpfProprietario(text.target.value)}
                            />
                          </ContentFormNew>




                          <ContentFormNew className='form-control-group'>
                            <label>Logradouro do proprietário*</label>
                            <Field
                              required
                              value={logradouroProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setLogradouroProprietario(text.target.value)}
                            />
                          </ContentFormNew>


                          <ContentFormNew className='form-control-group'>
                            <label>Número do proprietário*</label>
                            <Field
                              required
                              value={numeroProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setNumeroProprietario(text.target.value)}
                            />
                          </ContentFormNew>
                          <ContentFormNew className='form-control-group'>
                            <label>Cidade do proprietário*</label>
                            <Field
                              required
                              value={cidadeProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setCidadeProprietario(text.target.value)}
                            />
                          </ContentFormNew>

                          <ContentFormNew className='form-control-group'>
                            <label>Estado do proprietário*</label>
                            <Field
                              required
                              value={estadoProprietario}
                              component='select'
                              name='uf'
                              onChange={(text: any) => setEstadoProprietario(text.target.value)}
                            >
                              <option value='' hidden >Selecione o Estado</option>
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

                          <ContentFormNew className='form-control-group'>
                            <label>CEP do proprietário*</label>
                            <Field
                              required
                              value={cepProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setCepProprietario(text.target.value)}
                            />
                          </ContentFormNew>

                          <ContentFormNew className='form-control-group'>
                            <label>Bairro do proprietário*</label>
                            <Field
                              required
                              value={bairroProprietario}
                              name='cidade'
                              type='text'
                              onChange={(text: any) => setBairroProprietario(text.target.value)}
                            />
                          </ContentFormNew>
                          */}


                        </Form>
                      )}
                    />
                  </ContentFormNew>
                  {loading ? (
                    <img
                      width="40px"
                      style={{ margin: "auto" }}
                      height=""
                      src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
                      alt="Loading"
                    />
                  ) : (
                    <NewBtn>
                      <button type="button" onClick={() => setShowModal1(false)}>Cancelar</button>
                      <button type="submit" onSubmit={criarOuAtualizarEmpresa}>Adicionar</button>
                    </NewBtn>
                  )}
                </ContentFormNew>

              </ContentFormNew>

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
                {logradouro ? 'Alterar ' : 'Adicionar '}
                endereço</h3>


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
                          required
                          value={cep}
                          name='cep' type='text'
                          onBlur={(ev: any) => onBlurCep(ev, setFieldValue)}
                          onChange={(text: any) => setCep(text.target.value)}
                        />

                      </ContentFormNew>

                      <ContentFormNew className='form-control-group'>
                        <label>Logradouro</label>
                        <Field
                          required
                          value={logradouro}
                          name='logradouro'
                          type='text'
                          onChange={(text: any) => setLogradouro(text.target.value)} />
                      </ContentFormNew>

                      <ContentFormNew className='form-control-group'>
                        <label>Número</label>
                        <Field
                          required
                          value={numero}
                          name='numero'
                          type='text'
                          onChange={(text: any) => setNumero(text.target.value)}
                        />
                      </ContentFormNew>

                      <ContentFormNew className='form-control-group'>
                        <label>Complemento</label>
                        <Field
                          required
                          value={complemento}
                          name='complemento'
                          type='text'
                          onChange={(text: any) => setComplemento(text.target.value)}
                        />
                      </ContentFormNew>

                      <ContentFormNew className='form-control-group'>
                        <label>Bairro</label>
                        <Field
                          required
                          value={bairro}
                          name='bairro'
                          type='text'
                          onChange={(text: any) => setBairro(text.target.value)}
                        />
                      </ContentFormNew>

                      <ContentFormNew className='form-control-group'>
                        <label>Cidade</label>
                        <Field
                          required
                          value={cidade}
                          name='cidade'
                          type='text'
                          onChange={(text: any) => setCidade(text.target.value)}
                        />
                      </ContentFormNew>

                      <ContentFormNew className='form-control-group'>
                        <label>Estado</label>
                        <Field
                          required
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
              <ContentFormNew>
                {loading ? (
                  <img
                    width="40px"
                    style={{ margin: "auto" }}
                    height=""
                    src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
                    alt="Loading"
                  />
                ) : (
                  <NewBtn>
                    <button type="button" onClick={messageCancel}>Cancelar</button>
                    <button type="submit" onClick={changePlace}>Adicionar</button>
                  </NewBtn>
                )}
              </ContentFormNew>


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
                    src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
                    alt="Loading"
                  />
                ) : (
                  <div className="buttonsNew">
                    <button type="button" onClick={closeModalResetSenha}>
                      Cancelar
                    </button>
                    <button type="button" onClick={resetSenha}>
                      Adicionar
                    </button>
                  </div>
                )}
              </ContentFormNew>

            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>



    </>
  );
}
