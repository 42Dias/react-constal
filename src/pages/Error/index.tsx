import React, { useEffect, useState } from "react";
import Header from "../../components/Header"
import * as S from './Error.styled'
import error from '../../assets/images/error.png'
import { Link } from 'react-router-dom'
import { Menu } from "../../components/Menu"

export default function Error() {
  return (
    <>
      <Header />
      <Menu />
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