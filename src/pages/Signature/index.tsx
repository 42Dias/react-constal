import Header from "../../components/Header"
import Menu from "../../components/Header"
import * as S from './Signature.styled'

export default function Signature() {
  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Planos de cobrança da plataforma</S.Title>
        <S.Cards>
          <S.Card>
            <h3>Profissional</h3>
            <p>Perfeito para sua empresa alcançar mais clientes</p>
            <strong>R$ 99,99/mês</strong>
            <button type="button">Adquirir</button>
          </S.Card>
          <S.Card>
            <h3>Premium</h3>
            <p>Perfeito para sua empresa alavancar ainda mais produtos</p>
            <strong>R$ 179,99/mes</strong>
            <button type="button">Adquirir</button>
          </S.Card>
          <S.Card>
            <h3>Free</h3>
            <p>Para você que só está dando uma olhadinha em nossa plataforma</p>
            <strong>R$ 00,00/mês</strong>
            <button type="button">Adquirir</button>
          </S.Card>
        </S.Cards>
      </S.Container>
    </>
  )
}