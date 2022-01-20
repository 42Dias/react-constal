import Header from "../../components/Header"
import MenuCliente from "../../components/MenuCliente"

import * as S from './Accounts.styled'

export default function Accounts() {
  return (
    <>
     <Header />
      <MenuCliente />
      <S.Container>
        <S.Content>
          <h1>Contas</h1>
          <fieldset>
          <label htmlFor="start">Inicío</label>
          <input id="start" type="date" />
          </fieldset>

          <fieldset>
          <label htmlFor="end">Fim</label>
          <input id="end" type="date" />
          </fieldset>

          <span>Nome do Cliente</span>
          <p>Valor pago: <strong>R$ 1.000,00</strong></p>
          <p>Quantidade: 3</p>
          <a href="/">página da fatura</a>

          <span>Nome do Cliente</span>
          <p>Valor pago: <strong>R$ 1.000,00</strong></p>
          <p>Quantidade: 3</p>
          <a href="/">página da fatura</a>

          <span>Nome do Cliente</span>
          <p>Valor pago:<strong>R$ 1.000,00</strong></p>
          <p>Quantidade: 3</p>
          <a href="/">página da fatura</a>

          <span>Nome do Cliente</span>
          <p>Valor pago: <strong>R$ 1.000,00</strong></p>
          <p>Quantidade: 3</p>
          <a href="/">página da fatura</a>

          <h3>Valor total: R$ 1.500,00</h3>
        </S.Content>
      </S.Container>
    </>
  )
}