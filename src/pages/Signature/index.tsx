import Header from "../../components/Header"
import { Menu } from "../../components/Menu";
import { role, ip, status } from "../../services/api";
import * as S from './Signature.styled'

export default function Signature() {
  if(role !== "admin" && role !== "empresa" || status === "pendente"){
    // Simulate an HTTP redirect:
    window.location.replace(`${ip}/#/erro`);
  }
  return (
    <>
      <Header />
      <Menu />
      <S.Container>
        <S.Title>Planos de cobrança da plataforma</S.Title>
        <S.Cards>
          <S.Card>
            <h3>Free</h3>
            <p>Para você que só está dando uma olhadinha em nossa plataforma</p>
            <p style={{color: "green"}}>Taxa de 5% por pedido finalizado</p>
            <strong>R$ 00,00/mês</strong>
            <button type="button">Adquirir</button>
          </S.Card>
        </S.Cards>
      </S.Container>
    </>
  )
}