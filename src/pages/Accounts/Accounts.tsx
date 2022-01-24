import { useEffect, useState } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { toast } from "react-toastify";
import Header from "../../components/Header"
import { Menu } from "../../components/Menu"
import { api, id, role } from "../../services/api";
import { formatPrice } from "../../util/format";

import * as S from './Accounts.styled'

export default function Accounts() {




  const [faturas = [], setFaturas] = useState([]);
  const [displayedFaturas = [], setDisplayedFaturas] = useState<any>([]);
  const [soma, setSoma] = useState(0);

  const [dataInicial, setDataInicial] = useState<any>();
  const [dataFinal, setDataFinal] = useState<any>();

  function somaFaturas(faturas: any){
    setSoma(0) 
    faturas.map(
      (fatura: any) => {
        let precoTotalFatura = parseFloat(fatura.precoTotal) 
        console.log(
          parseFloat(fatura.precoTotal)
          )
      setSoma(
        (prevValues) => prevValues +  precoTotalFatura
      )
      }
    )
  }
  async function loadFaturas(){
    if(role == 'admin'){
      const response = await api.get(`pedido-fatura`)
      setFaturas(response.data)
      setDisplayedFaturas(response.data)
      // response.data.map(
      //   (fatura: any) => {
      //     let precoTotalFatura = parseFloat(fatura.precoTotal) 
      //     console.log(
      //       parseFloat(fatura.precoTotal)
      //       )
      //   setSoma(
      //     (prevValues) => prevValues +  precoTotalFatura
      //   )  
      // }
      // )
      somaFaturas(response.data)
    }
    else if (role == 'empresa'){
      toast.info("Você é empresa")
      const response = await api.get(`pedido-fatura?filter%5Bid%5D=${id}`)
      setFaturas(response.data)
      setDisplayedFaturas(response.data)
      // response.data.map(
      //   (fatura: any) => {
      //     let precoTotalFatura = parseFloat(fatura.precoTotal) 
      //     console.log(
      //       parseFloat(fatura.precoTotal)
      //       )
      //   setSoma(
      //     (prevValues) => prevValues +  precoTotalFatura
      //   )  
      // }
      // )
      somaFaturas(response.data)
    }
    else{
      toast.error("Você tem permissão?")
    }
  }
  useEffect(
    () => {
      loadFaturas()
      

    }, []
  )

  /*
  createdAt: "2022-01-05T12:17:09.000Z"
  deletedAt: null
  fornecedorEmpresaId: "0311e6fe-e43f-4998-b85a-58ab16e7cae9"
  id: "677b19d1-dfa4-4dc0-817e-e04e1d006a22"
  idIugu: "8709F7451CF64B5FA1BA6AC555C9C7D0"
  pedidoId: "29725710-5a5a-495b-a415-ccb9eaf2b44f"
  precoTotal: "980.00"
  precoUnitario: "980.00"
  produtoId: "bcc3ae1c-2353-43de-b34b-019101efd3f7"
  quantidade: 1
  status: "pendente"
  true: null
  updatedAt: "2022-01-05T12:17:09.000Z"
  urlFaturaIugu: "https://faturas.iugu.com/8709f745-1cf6-4b5f-a1ba-6ac555c9c7d0-3ad7"
  */


  /*
  let dh = '2022-01-05T12:32:09.000Z'
  let ndh = dh.substr(0,10)
  "2022-01-05"

  let aaa = new Date(ndh)
  undefined
  aaa
  Date Tue Jan 04 2022 21:00:00 GMT-0300 (Brasilia Standard Time)

  Desconverter e passar dentro de um if só (a < data && a > data2)
  */
  async function unsetFilter() {
    console.log("DESFILTRAR HA HA HA")
    setDisplayedFaturas(faturas)
    somaFaturas(faturas)    
  }

  async function setFilter() {
    if(dataInicial > dataFinal || dataInicial == undefined && dataFinal == undefined){
      setDisplayedFaturas(faturas)
      toast.error("Datas Invalidas")
      return
    }

    setDisplayedFaturas([])
      
    let existeDataInicial = !dataInicial === false
    let existeDataFinal = !dataFinal === false
    /*
    Problemas no set
    */
   
    faturas.map(
      (fatura:any) => {
        let createdAtFormatado = fatura.createdAt.substr(0,10)
        console.log(createdAtFormatado)

        let createdAtConvertido = new Date(createdAtFormatado)
        console.log("createdAtConvertido")
        console.log(createdAtConvertido)

        if(existeDataInicial && !existeDataFinal){
          console.log("TEM SÓ A INICIAL")
          console.log("createdAtConvertido é maior do que data inicial?")
          console.log(dataInicial)

          if(createdAtConvertido > dataInicial){
          console.log("É SIM")
            setDisplayedFaturas((prevValues: any) => {
              return [...new Set([...prevValues, fatura])]	
               })
          }
          else{
            console.log("É NÃO")
          }
        }
        if(!existeDataInicial && existeDataFinal){
          console.log("TEM SÓ A FINAL")

          console.log("createdAtConvertido é menor do que data final?")
          console.log(dataFinal)
          if(createdAtConvertido < dataFinal){
            console.log("É SIM")
            setDisplayedFaturas((prevValues: any) => {
              return [...new Set([...prevValues, fatura])]	
               })
          }
          else{
            console.log("É NÃO")
          }
        }
        else{
          console.log("TEM OS DOIS KKKKKKKK")
          if(dataInicial <= createdAtConvertido && createdAtConvertido <= dataFinal){
            console.log("É SIM")
            setDisplayedFaturas((prevValues: any) => {
              return [...new Set([...prevValues, fatura])]	
               })
          }
        }
      }
      )
      somaFaturas(displayedFaturas)
    return
  }


  return (
    <>
     <Header />
     <Menu />
      <S.Container>
        <S.Content>
          <h1>Contas</h1>

          <fieldset>
          <label htmlFor="start">Inicío</label>
          <input 
            type="date" 
            id="meeting-time"
            onChange={
              (e) => {
                console.log(e.target.value)
                let novaData = new Date(e.target.value)
                let dataNaoValida = isNaN(novaData.valueOf())

                if(dataNaoValida){
                  toast.error("Data Inválida!")
                }
                else{
                  setDataInicial(new Date(e.target.value))
                }
              }
            }
            />
          </fieldset>

          <fieldset>
          <label htmlFor="end">Fim</label>
          <input 
            type="date" 
            id="meeting-time"
            onChange={
              (e) => {
                console.log(e.target.value)
                let novaData = new Date(e.target.value)
                let dataNaoValida = isNaN(novaData.valueOf())

                if(dataNaoValida){
                  toast.error("Data Inválida!")
                }
                else{
                  setDataFinal(new Date(e.target.value))
                }
              }
            }
            />
          </fieldset>
          <h3>
          {displayedFaturas.length == 0  ? (<h3>Você não tem nenhum valor a receber :(</h3>): false }
          </h3>

          {
          displayedFaturas.map(
            (fatura: any) => (
              <>
              <span>Nome do Cliente</span>
              <span>
                Preço Unitário: {
                   formatPrice(
                    fatura.precoUnitario
                      )            
                }
              </span>
              <p>Quantidade: {fatura.quantidade}</p>
              <p>Valor pago: 
                <strong>
                {
                   formatPrice(
                    fatura.precoTotal
                      )            
                }
                </strong>
              </p>
              <a href="/">página da fatura</a>
              </>
              )
            )
            }

          <h3>
            Valor total: {
                    formatPrice(soma)
                    }
          </h3>
        </S.Content>
      </S.Container>
    </>
  )
}