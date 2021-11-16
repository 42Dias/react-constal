import Header from "../../components/Header"
import * as S from './Error.styled'
import error from '../../assets/images/error.svg'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <>
      <Header />
      <S.ContainerError>
        <S.ErrorPage>
        <h1>Algo deu errado!</h1>
        <Link to='/'>Página inicial</Link>
        <img src={error} alt="erro" />
        </S.ErrorPage>
      </S.ContainerError>
    </>
  )
}