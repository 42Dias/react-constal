import Header from "../../components/Header"
import Footer from "../../components/Footer"
import * as S from './NewPlan.styled'
import { Link } from 'react-router-dom'
import { Menu } from "../../components/Menu"

function NewPlan() {
  return (
    <>
      <Header />
      <Menu />
      <S.Container>
        <S.Form>
        <h2>Novo plano</h2>
        <label htmlFor="name">Nome do plano*</label>
        <input id="name" />
        <label htmlFor="description">Descrição*</label>
        <input id="description" />
        <label htmlFor="validation">Validações*</label>
        <input id="validation" />
        <label htmlFor="price">Valor*</label>
        <input id="price" />
        <Link to='/' style={{ background: '#f2f2f2', color: 'black' }}>Cancelar</Link>
        <Link to='/'>Adicionar</Link>
        </S.Form>
      </S.Container>
      <Footer />
    </>
  )
}

export default NewPlan