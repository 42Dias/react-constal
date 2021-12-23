import Header from "../../components/Header";
import Footer from "../../components/Footer";
import check from "../../assets/images/check-icon.svg";
import { Link } from "react-router-dom";
import { FooterContainer, CenterFinish } from "./styles";
import { Menu } from "../../components/Menu";
import axios from "axios";
import { ip } from "../../services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


export default function CheckEmail() {
  const hash = window.location.hash.replace(`http://${ip}:3000/constal#/checar-email/`, '');
  const [loading, setLoading] = useState(false);

  function verificaEmail(){
    var id = hash.replace('#/checar-email/', '')
    setLoading(true)
    axios.post(`http://${ip}:8157/api/tenant/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/userVerificarEmail/${id}`
  ).then((response) => {
    if (response.statusText == "OK") {
      toast.info('Email verificado com sucesso!');
      setLoading(false)
    }else{
      toast.error('Email não verificado com sucesso!');
      setLoading(false)
    }
  });
  }
  
  useEffect(() => {
    verificaEmail()
    
  }, []);
    return (
      <>
        <Header />
        <Menu />
          <div className="container">
            <CenterFinish>
              <img src={check} alt="" />
              <h2>Email verificado com sucesso</h2>
              {loading ? (
              <img
                width="40px"
                style={{ margin: "auto" }}
                height=""
                src={"https://contribua.org/mb-static/images/loading.gif"}
                alt="Loading"
              />
            ) :
              <Link to="/">Início</Link>}
            </CenterFinish>
          </div>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  
}
