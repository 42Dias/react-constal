import Header from "../../components/Header"
import { Menu } from "../../components/Menu";
import * as S from './Signature.styled'



import { role, ip, status, api } from "../../services/api";
import { useEffect, useState } from "react";
import { ContentFormNew, ModalContent } from "../Dashboard/NewProd/styles";

// @ts-ignore
import InputMask from "react-input-mask";
import { NewBtn } from "../Dashboard/PersonalData/styles";
import { toast } from 'react-toastify';



export default function SendData() {
  const [telefone, setTelefone] = useState<any>("");
  const [seguranca, setSeguranca] = useState<any>("");
  const [logradouro, setLogradouro] = useState<any>("");
  const [bairro, setBairro] = useState<any>("");
  const [CNPJ, setCNPJ] = useState<any>("");
  const [CEP, setCEP] = useState<any>("");
  const [sobre, setSobre] = useState<any>("");
  const [direitos, setDireitos] = useState<any>("");
  const [numero, setNumero] = useState<any>('')
  const [cidade, setCidade] = useState<any>('')
  const [estado, setEstado] = useState<any>('')
  const [complemento, setComplemento] = useState<any>('')


  function onBlurCep (ev: any) {
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

  function createOrUpdateInformations(data: any){
    toast.info("Carregando")
    api.post('informacoes-create-or-update', data).then(
      (res: any) => {
        console.log(res)
        console.log(res)
        if(res.status == 200){
          toast.info('Ação feita com sucessso! :)')
        }

        else{
          toast.error('Algo deu errado :(')
        }
      }
    )
  }
  
  function makeRequisition(){
    const data = {
      data: {
        telefone: telefone,
        seguranca: seguranca,
        logradouro: logradouro,
        bairro: bairro,
        cnpj: CNPJ,
        cep: CEP,
        sobre: sobre,
        direitos: direitos,
        numero: numero,
        cidade: cidade,
        estado: estado,
        complemento: complemento,
      }
    }
    createOrUpdateInformations(data)
  }

  function loadInformations(){
    api.get('informacoes').then(
      (res) => {
        let data = res.data.record[0]
        console.log(data)
        setTelefone(data.telefone)
        setSeguranca(data.seguranca)
        setLogradouro(data.logradouro)
        setBairro(data.bairro)
        setCNPJ(data.cnpj)
        setCEP(data.cep)
        setSobre(data.sobre)
        setDireitos(data.direitos)
        setNumero(data.numero)
        setCidade(data.cidade)
        setEstado(data.estado)
        setComplemento(data.complemento)
      }
    )
  }
  
  
  
  
  
  useEffect(
    () => {
      /*
      função de load
       -- função de set
      */
     loadInformations()
    }, []
  )





  if(role !== "admin" && role !== "empresa" || status === "pendente"){
    // Simulate an HTTP redirect:
    window.location.replace(`${ip}/#/erro`);
  }
  return (
    <>
      <Header />
      <Menu />

      <ModalContent>
        <h3>Ajuda</h3>
        <ContentFormNew>
                <label htmlFor="">Segurança e Privacidade</label>
                  <textarea
                    required
                    value={seguranca}
                    onChange={(e: any) => {
                      let text = e.target.value
                      setSeguranca(text)
                    }} />
                  <label htmlFor="">Contato</label>
                  <InputMask
                      mask=" (99) 9 99999-9999"
                      value={telefone}
                      onChange={
                        (e: any) => {
                          let telefone = e.target.value
        
                          setTelefone(telefone)
                        }
                      }
                      />
            </ContentFormNew>
            
            <h3>Endereço</h3>
            <ContentFormNew>
            <div>
        
                  <ContentFormNew className='form-control-group'>
                    <label>Cep*</label>
                    <InputMask
                    mask="99999-999"
                    value={CEP}
                    required
                      name='cep' type='text'
                      onBlur={(ev: any) => onBlurCep(ev)}
                      onChange={(text: any) => setCEP(text.target.value)}
                      />
    
    
                  </ContentFormNew>
                  <ContentFormNew className='form-control-group'>
                    <label>Logradouro*</label>
                    <input
                    required
                    value={logradouro}
                    name='logradouro'
                    type='text'
                    onChange={(text: any) => setLogradouro(text.target.value)} />
                  </ContentFormNew>
                  <ContentFormNew className='form-control-group'>
                    <label>Número*</label>
                    <input
                    required
                    value={numero}
                    name='numero'
                    type='text'
                    onChange={(text: any) => setNumero(text.target.value)}
                      />
                  </ContentFormNew>
                  <ContentFormNew className='form-control-group'>
                    <label>Complemento</label>
                    <input
                    value={complemento}
                    name='complemento'
                    type='text'
                    onChange={(text: any) => setComplemento(text.target.value)}
                      />
                  </ContentFormNew>
                  <ContentFormNew className='form-control-group'>
                    <label>Bairro*</label>
                    <input
                    required
                    value={bairro}
                    name='bairro'
                    type='text'
                    onChange={(text: any) => setBairro(text.target.value)}
                      />
                  </ContentFormNew>
                  <ContentFormNew className='form-control-group'>
                    <label>Cidade*</label>
                    <input
                    required
                    value={cidade}
                    name='cidade'
                    type='text'
                    onChange={(text: any) => setCidade(text.target.value)}
                      />
                  </ContentFormNew>
                  <ContentFormNew className='form-control-group'>
                    <label>Estado*</label>
                    <select
                    required
                    value={estado}
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
                    </select>
                  </ContentFormNew>
                </div>
                <label htmlFor="">CNPJ</label>
                <InputMask
                      required mask="99.999.999/9999-99" 
                      value={CNPJ} 

                      // 01.161.734/0001-15
                      onChange={
                        (e: any) => {
                          let cnpj = e.target.value
                          setCNPJ(cnpj)
                        }
                      }
                      />
          </ContentFormNew>

          <h3>Sobre</h3>
          <ContentFormNew>
                <label htmlFor="">Sobre a constal</label>
                <textarea
                    required
                    value={sobre}
                    onChange={(e: any) => {
                      let text = e.target.value
                      setSobre(text)
                    }} />
                <label htmlFor="">Direitos reservados</label>
                <input
                      value={direitos}
                      required
                      type="text"
                      onChange={(e: any) => {
                        let text = e.target.value
                        setDireitos(text)
                      }} />
          </ContentFormNew>
          {/* <button
          onClick={makeRequisition}
          >
            HAHAHAHAHAH
          </button> */}

          <NewBtn>
                <button type="button" onClick={() => window.location.hash= '#/'}>Cancelar</button>
                <button type="button" onClick={makeRequisition}>Adicionar</button>
          </NewBtn>
      </ModalContent>
    </>
  )
}