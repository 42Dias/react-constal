import { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";
import { BoxRegister, GridRegister, LinkContent, Terms } from "./styles";
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Menu } from "../../components/Menu";
import { api, id, ip, token } from "../../services/api";
import axios from "axios";
import * as S from '../Signature/Signature.styled'
import { ModalContainerVendedor, ModalContent, ModalFlex } from "../Produto/styles";
// import { Modal } from "../../components/Header/styles";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";
import Modal from "react-modal";
import Loading from "../../components/Loading";


export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [category, setCategory] = useState('1');
  const [loading, setLoading] = useState(false);

  const [linkTo, setLinkTo] = useState('');

  const [modalIsOpen, setIsOpen] = React.useState(false);


  function handleCreateUser(event: FormEvent) {
    event.preventDefault();
    // // console.log({
    //   nome,
    //   email,
    //   senha,
    //   category
    // });
    Cadastro();
  }
  function handleLocalStorage(emailA: string, passwordB: string) {

    localStorage.setItem("email", JSON.stringify(emailA));//saves client's data into localStorage:
    localStorage.setItem("password", JSON.stringify(passwordB));//saves client's data into localStorage:
  }
  async function senEmail() {
    Axios.post(`${ip}:8157/api/cliente/${id}/${token}/verificarEmail`, {
      email: email
    }).then((response) => {
      if (response.statusText == "OK") {
        toast.info('Email enviado com sucesso!');
        setLoading(false)
        handleClickLogin();
      } else {
        toast.error('Email não enviado com sucesso!');
      }
    });
  }
  async function loadUser(token: any) {
    const response = await axios({
      method: 'get',
      url: `${ip}:8157/api/auth/me`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      timeout: 50000
    }).then(response => {
      return response.data;
    })
    // console.log(response);
    let setRole = response.tenants[0].roles
    const roleHelper = JSON.parse(setRole)
    // console.log(roleHelper[0])
    localStorage.setItem("roles", JSON.stringify(roleHelper[0])); //saves client's data into localStorage:

    // console.log(response.tenants[0].tenant.id);
    localStorage.setItem("tenantId", JSON.stringify(response.tenants[0].tenant.id));//saves client's data into localStorage:
    localStorage.setItem("id", JSON.stringify(response.id));//saves client's data into localStorage:
    localStorage.setItem("status", JSON.stringify(response.tenants[0].status));//saves client's data into localStorage:
    senEmail();
  }
  function handleLocalStorageToken(token: string[]) {
    const setLocalStorage = (data: string[]) => {
      localStorage.setItem("token", JSON.stringify(data)); //saves client's data into localStorage:
    };
    setLocalStorage(token);
    loadUser(token)
  }
  async function Cadastro() {
    setLoading(true)
    let responser = Axios.post('' + ip + ':8157/api/auth/sign-up', {
      fullName: nome,
      email: email,
      password: senha,
      role: parseInt(category),
      status: ''
    }).then((response) => {
      // console.log(response);
      if (response.statusText === "OK") {
        toast.info('Opa, recebemos o seu registro :)');
        if (category == '2') {
          toast.info('Obrigado pela sua adesão');
        }
        handleLocalStorage(email, senha);
        handleLocalStorageToken(response.data);
      } else if (response.statusText === "Forbidden") {
        toast.error("Ops, Não tem permisão!");
        setLoading(false)
      } else {
        toast.error("Ops, Dados Incorretos!");
        setLoading(false)
      }
    }).catch(res => {
      if (res.response.data) {
        toast.error(res.response.data);
      }
      else {
        toast.error("Erro no servidor, tente mais tarde :(");
      }
      setLoading(false)
    })

  }
  let history = useHistory();
  function handleClickLogin() {
    // window.location.reload()
    let localRole = localStorage.getItem('role')
    // console.log(localStorage.getItem('token'))
    if(category == '1'){
      window.location.hash = `#/meu-perfil/${localStorage.getItem('token')?.replace(/"/g, "")}`
    }
    else if(category == '2'|| category == '3'){
      window.location.hash = `#/dados-pessoais`
    }
    else{
      toast.error("NÃO PEGOU A ROLE")
      // console.log(localRole)
    }
  }



  function openModal() {
    setIsOpen(true);
  }
  /*
  Não tem a ver com o produto cadastrado
  o adicionar
  
  */
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function loadTermos(){
    await axios.get(`${ip}:8157/api/termoTrue`).then(
      (res) => {
        setLinkTo(res.data.record[0].url)
      }
    )
  }

  useEffect(
    () => {
      loadTermos()
    },[]
  )

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <BoxRegister onSubmit={handleCreateUser}>
          <h2>Preencha os campos com seus dados</h2>
          <GridRegister>
            <div>
              <label htmlFor="nome">Nome completo</label>
              <input
                required
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={event => setNome(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />

            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <input
                required
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={event => setSenha(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="cadastrar">Cadastrar como:</label>

              <select
                required
                value={category}
                onChange={event => setCategory(event.target.value)}
              >
                <option value={"1"}>Cliente</option>
                <option value={"2"}>Empresa</option>
                <option value={"3"}>Admin</option>
              </select>
            </div>
          </GridRegister>
          {category === "2" ?
            <S.Container style={{ margin: "0 auto" }} >
              <S.Title>Planos de cobrança da plataforma</S.Title>
              <S.Cards>
                <S.Card>
                  <h3>Free</h3>
                  <p style={{ color: "#58A4B0" }}>Taxa de 5% por venda finalizada</p>
                  <strong>R$ 00,00/mês</strong>


                  {/*<button type="button">Adquirir</button>*/}
                </S.Card>
              </S.Cards>
            </S.Container> : false}
          <Terms>
            <input
            required 
            type="checkbox" />
            <span>
              Aceito os <b 
              onClick={
                // @ts-ignore
                () => linkTo ?  window.open(`${linkTo}`) : openModal()
              }

              style={
                {
                  cursor: 'pointer'
                }
              }
              >Termos e condições
                {
                  category == '2' ? ' e plano de assinatura' : ''
                }
                .</b>
            </span>
          </Terms>
          <LinkContent>
            {loading ? <Loading loading={loading}/>  :
              <button type="submit">Cadastrar</button>}
          </LinkContent>
        </BoxRegister>
      </div>

      <ModalContainerVendedor>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div>
            <ModalFlex>
              <AiOutlineClose
               onClick={closeModal}
              />
            </ModalFlex>

            <ModalContent
            style={
              {
                textAlign: 'justify'
              }
            }
            >

              <p>
                <h3>TERMOS DE USO E POLÍTICA DE PRIVACIDADE</h3>
<p>
  Olá! <br />
  Bem-vindo à Constal.
  Antes de fornecer qualquer tipo de informação e dado, leia atentamente os presentes termos de uso e política de privacidade, esses lhe ajudarão a utilizar nossa Plataforma de Marketplace.
  Fique tranquilo, os dados pessoais fornecidos a Constal estarão protegidos, resguardados e terão absoluto sigilo e confidencialidade.
  Informamos que para o utilizar nossos serviços de intermediação são necessários consentimento e aceite, por isso ao acessar e utilizar o serviço da plataforma Constal, Você inequivocamente concorda e aceita com as condições e recomendações apresentadas nesses termos.
  DEFINIÇÕES.
</p> 
<ul>
  Para facilitar a compreensão do presente termo, entende-se por:

      <li> Usuário: a pessoa natural (física) ou pessoa jurídica que consentiu e aderiu eletronicamente ao presente termo ao selecionar a concordância e clicar no “aceite”, que forneceu de forma livre, gratuita e voluntária seus dados e que gerencia sua conta, na Plataforma Constal.   Salvo quando expressamente indicado em contrário, os termos “você”, “seu” ou “sua” se referem ao Usuário.</li>
      
      <br />

      <li> Profissional Autônomo: profissional especializado de formação técnica especifica para o setor da construção civil, tais como, mas não limitado a pedreiro, encanador, eletricista, marceneiro, limpeza, mestre de obras, segurança, arquiteto, paisagista e engenheiros.</li>
      
      <br />

      <li> Empresa Credenciada e Independente: pessoa jurídica, prestadora de serviço ou fornecedora de produtos, equipamentos e materiais para ramo da construção civil, com registro regular nos órgãos competentes, tais como, mas não limitado loja de materiais para construção, engenharia, incorporadora, imobiliária, terraplanagem, locação de equipamentos, segurança, manutenção e guarda de materiais e equipamentos.</li>
      <br />

      
      <li> Conta Digital: é a conta do Usuário que após consentir, ele inseriu e forneceu livremente às informações e dados de sua titularidade. Nessa conta, a Constal viabiliza meios e disponibiliza funções e recursos tecnológicos e digitais, para que o Usuário possa ter contato e acesso diretamente com outros Usuários, profissionais autônomos e empresas credenciadas e independentes, além disso poderá o Usuário acompanhar, selecionar, divulgar, visualizar, interagir, negociar e contratar serviços ou adquirir produtos, materiais e equipamentos, para o setor da construção civil, sem qualquer intervenção da Constal.</li>
      <br />
      
      <li> Contrato: é o presente termo de uso da plataforma Constal, ao qual você adere e concorda.</li>
      <br />

</ul>
<h3>QUEM SOMOS.</h3>
<p>Somos a Plataforma de Marketplace Constal, nosso CNPJ é 36.633.924/0001-72 e estamos localizados à Rua Cardoso Pimentel, nº 660, sala 1, Bairro Centro, Município de Porto Feliz, Estado de São Paulo, CEP: 18.540-000. </p>
<p>Caso precise falar com a gente poderá mandar e-mail para contato@constal.com.br </p>
<h4>O QUE SOMOS E NÃO SOMOS</h4>
<p>O que a Constal é? Intermediadora, o que significa que é uma ferramenta digital, tecnológica de auxílio na intermediação, ou seja, é complementar à cadeia da construção civil, pois apenas presta o serviço de facilitadora e fornecedora de recursos tecnológicos, por meio da plataforma digital, para a eventual e potencial conexão dos Usuários pessoas naturais (físicas) ou jurídicas, que possuem desejos individuais, mas em comum.</p>
<p>O que a Constal, não é? Não é fornecedora de produtos, materiais e equipamentos para o setor da construção civil, tampouco prestadora de serviço deste setor, em razão disso a Constal não possui, nem tem qualquer responsabilidade, gerência, intervenção, participação sobre as informações, inclusive validade, garantia, legalidade, qualidade e quantidade dos produtos, materiais, equipamentos e serviços anunciados ou divulgados pelos Usuários, profissionais autônomos e empresas credenciadas e independentes, por meio da plataforma.</p>
<p>Por ter caráter complementar e acessório, a Constal não tem ou existe subordinação, hierarquia, joint-venture, sociedade, grupo-econômico, vínculo empregatício ou trabalhista com Você, Usuário, com o Profissional Autônomo e com as Empresas Credenciadas e Independentes, como resultado da concordância e aceite deste termo ou pelo uso da Plataforma.</p>
<p>A Constal também não garante sucesso, êxito, aumento nas vendas, receitas ou lucro, nem que ao usar a plataforma haverá interações entre os usuários.</p>
<h4>QUAL O OBJETIVO</h4>
<p>Os presentes termos de uso e política de privacidade objetiva informar e esclarecer o compromisso que a Constal tem com a privacidade e segurança dos dados pessoais seus Usuários, em respeito a dignidade da pessoa humana, na forma e para os efeitos da lei.</p>
<p>Importante lembrar Você, que a Plataforma não usa nenhum tipo cookies e cumpre com todas as leis, aplicáveis ao caso, em especial a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).</p>
<p>Aqui, Você encontrará de forma clara e precisa as informações da Constal, e, ainda, conhecerá as condições e recomendações de uso da Plataforma, bem como suas obrigações, deveres e direitos como Usuário. </p>
<h5>INÍCIO E DURAÇÃO </h5>
<p>Os efeitos e eficácia dos presentes termos e condições e política de privacidade têm início na data de seu aceite e concordância, e a duração deles é por prazo indeterminado ou enquanto não sobrevier versão atualizada destes termos, obrigando as partes, seus herdeiros e sucessores.</p>
<h4>QUAIS DADOS COLETAMOS E PORQUE COLETAMOS.</h4>
<p>Lembre-se ao consentir Você declarou inequivocamente que leu, entendeu e aceitou integralmente as recomendações e condições estabelecida nestes termos de uso e política de privacidade. </p>
<p>Feita essa ressalva, cabe informarmos aos Usuários que, para o serviço de intermediação seja prestado adequadamente e cumpra com sua finalidade, a Constal poderá solicitar eventualmente as seguintes informações e dados pessoais para cadastro e abertura de sua conta digital:</p>
    a) [o] <br />
    b) [o] <br />
    c) [o] <br />
<p>Esses dados são fundamentais para a individualização e identificação dos Usuários, mas também para acesso e uso da sua conta digital, na Plataforma Constal. Os dados e informações serão coletados por meio de informações fornecidas e inseridas por quem consentiu e deseja ser Usuário, por essa razão pedimos que ao fornece-los ou inseri-los faça e aja com cautela e segurança e preserve o sigilo, confidencialidade e restrição deles.</p>
<p>Nunca divulgue ou compartilhe suas informações, seus dados, login e senha, nem forneça ou permita o acesso de terceiros em sua conta digital, ela é individual e pessoal.</p>
<p>Você concorda e se compromete que é e manterá sempre como verdadeiro, autêntico, preciso, exato, lícito e atualizado toda e qualquer informação e dado pessoal que inserir e fornecer, bem como divulgar ou anunciar relacionado ao serviço, produto, equipamento e material, na Plataforma Constal. </p>
<p>Desta maneira é de responsabilidade exclusiva dos Usuários, mas não se limitando aos danos diretos ou indiretos, materiais, morais, lucro cessante, a perda e vazamento ou compartilhamento indevido de dados, erros, imprecisões, ilícitos e violações que vier a causar a terceiros e a Plataforma, e, ainda, as correções, atualizações, manutenções, reparos e trocas que se fizerem necessários nos produtos, equipamentos, materiais e serviços divulgados na plataforma</p>
<p>A Constal assegura que adota e tomará as necessárias providencipas para assegurar a segurança, a confidencialidade e a proteção às informações e dados pessoal dos Usuários, armazenando-os em meios que dificultam o acesso de terceiros e que utilizem a criptografia de ponta a ponta, visando evitar a ocorrência de danos ou prejuízos a Você.</p>
<p>Contudo, Você está ciente e consente que imprevistos ocorrem e que nem tudo está sob o controle da Constal, de modo que a plataforma poderá eventualmente sofrer interrupções e oscilações devido manutenções técnicas nos sistemas, tais como internet, telecomunicação e energia elétrica, há também a possibilidade de ocorrer casos fortuitos ou força maior e ações de terceiros que impeçam a prestação ou acesso ao serviço, que todos essas situações a Constal e seus representantes não são responsáveis.</p>
<h5>REQUISITOS INDISPENSÁVEIS PARA ACESSO E USO DA PLATAFORMA.</h5>
<p>Informamos que para o acesso e uso da plataforma Constal são indispensáveis que o Usuário, conjuntamente:</p>
    a) tenha lido, aceito e concordado com os presentes termos e condições;
    <br />
    b) ter mais de 18 anos, para pessoas físicas; 
    <br />
    c) seja o titular dos dados;
    <br />
    d) tenha a capacidade civil e plena para compreender e aceitar os presentes termos e esteja
     legalmente desimpedido de fazê-los; 
     <br />
    e) faça o uso da plataforma de maneira ética e moral, com boa-fé e transparência nas relações e interações com outros Usuários; 
    <br />
    f) realize os pagamentos em dia, caso exista, e arque com todos os tributos de sua responsabilidade, bem como obrigações acessórias, conforme legislação aplicável.
    <br />
    <br />
    g) apenas anuncie ou divulgue produtos, equipamentos, materiais e serviços lícitos, legais e permitidos ou, de uso restrito e controlado de acordo com as normas legais, inclusive sanitárias, criança e adolescente, consumerista, segurança e ambiental. 
    <br />
    h) não divulgue e nem compartilhe a terceiros qualquer informação relacionada a plataforma.
    <br />
    i) se, responsabilize e responda exclusivamente por seus atos e de seus colaboradores e 
    <br />
    j) se, responsabilize exclusive e integralmente pelas obrigações que vierem a contrair entre si ou com profissional autônomo ou empresa credenciada independente.
    <br />
<p>No caso, do Usuário descumprir um desses requisitos, a ausência ou a inveracidade desses, autoriza a Constal a advertir, impedir, limitar, suspender, cancelar e excluir parcial ou integralmente o acesso e as funcionalidades da conta digital e o conteúdo gerado, divulgado ou anunciado dos produtos, equipamentos, materiais e serviços, pelo Usuário na plataforma, sem que isso caracterize inobservância ou restrição à liberdade de expressão, comunicação e manifestação de pensamento ou discriminação, e, ainda, sequer direitos a indenização ou ressarcimento. </p>
<p>Atenção para a idade. Ela se refere a idade mínima de 18 (dezoito) anos que o Usuário, pessoa física, necessita ter para acessar e usar os serviços da plataforma. Excepcionados os casos legais, se a idade for insuficiente ou não existir o discernimento cognitivo para compreender e consentir, o responsável legal deverá aceitar as recomendações e condições deste termo em nome do Usuário.</p>
<p>O Usuário reconhece que se cadastrou, optou e aceitou utilizar a Plataforma Constal de forma livre e espontânea, que o faz por sua conta e risco exclusivos e que compreende que a Constal é apenas ferramenta de meio que tem por objetivo auxiliar na intermediação dos Usuários na divulgação e contratação para o setor da construção civil.</p>
<p>Compreende também, que a Constal executará os serviços tecnológicos exclusivamente mediante ordem do Usuário, geradas a partir da Plataforma, utilizando as informações inseridas e existentes na respectiva conta digital.</p>
<h4>FINALIDADE DO TRATAMENTO DOS DADOS.</h4>
<p>Todos os dados e informações fornecidos pelo titular são essenciais para que a Constal atenda e preste legitimamente seus serviços de fornecer plataforma digital, para (i.) intermediar e conectar eventual e potencialmente pessoas naturais (físicas) ou jurídicas de forma individualizada, segura e precisa, (ii.) os Usuários divulgar e contratar produtos, equipamentos, materiais e serviços do setor da Construção Civil, (iii.) cobrar pelos serviços de intermediação e conexão prestados e (iv.) para cumprir obrigações legais.</p>
<p>Esclarecemos que o tratamento de dados também poderá ser feito para divulgação de conteúdo, realização de propaganda e marketing e oferta de produtos.</p>
<h4>COMPORTAMENTOS VEDADOS AO USUÁRIO</h4>
<p>O Usuário compreende e aceita que é rigorosamente proibido inserir, violar, reproduzir, imitar, copiar, suprimir, excluir, fotocopiar, filmar, gravar, invadir, implantar, sequestrar, retirar, modificar, destruir e inviabilizar qualquer propriedade intelectual, sistema ou dispositivo da plataforma Constal, bem como expressamente vedado conceder, permitir, deixar, facilitar, participar ou concorrer de alguma forma para que terceiros pratiquem aquelas condutas.</p>
<h4>COMPARTILHAMENTO DOS DADOS.</h4>

<p>Para melhor atender ao titular dos dados e prestar o serviço de intermediação e conexão de melhor qualidade, a Constal poderá compartilhar os dados e informações fornecidos e inseridos na plataforma aos seguintes parceiros IUGU SERVICOS NA INTERNET LTDA - SA, CNPJ do Beneficiário Original: 15.111.975/0001-64. Os quais possuem regras próprias para uso e política de privacidade, sem que a Constal tenha qualquer gerência ou subordinação sobre o conteúdo.</p>
<p>Afirmamos a Constal e seus parceiros são individuais sem qualquer relpação jurídica ou vínculo societário, de modo que agem com total autonomia e liberdade. </p>
<p>Fique calmo, a Constal não divulgará nenhuma informação e nenhum dado fornecido sem a prévia autorização do titular, exceto em caso de determinação judicial ou legal.</p>
<h4>PELA INTERMEDIAÇÃO COBRAMOS</h4>
<p>Pelos serviços prestados de intermediadora, Você pagará à Constal o valor correspondente a comissão, livre de impostos e custos e despesas diretas e indiretas. Para facilitar a pagamento o Usuário autoriza que a Constal faça a retenção do valor transacionado por meio da plataforma, sem nada a reclamar, além disso a comissão poderá variar de acordo com a quantidade e frequência de interações e contratações feitas por meio da plataforma. </p>
<p>A Constal se reserva ao direito de alterar à sua política de preços, de tempos em tempos, sempre que entender cabível e pertinente ao menos anualmente, para manter o equilíbrio financeiro dos serviços da plataforma. Todas e quaisquer alterações e reajustes no preço, na forma e meio de pagamento e cobrança serão comunicados antecipadamente com 30 (trinta) dias, da entrada em vigor dos novos valores, que serão considerados aceitos com a continuação do uso da plataforma após a mudança.</p>
<p>Se você não concordar com a alteração, poderá encerrar e cancelar seu cadastro, desde que antes da alteração de valores passe a produzir efeito. Para isso, veja como cancelar seu serviço no item abaixo.</p>
<p>Para saber mais clique aqui e leia os termos de pagamento.</p>
<h4>ARREPENDIMENTO E CANCELAMENTO DO CADASTRO</h4>
<p>Contente com o interesse em nossos serviços, a Constal confia na fidelização do titular dos dados e informações pela facilidade e oportunidade geradas com a conexão. Contudo, caso o titular se arrependa em até 7 (sete) dias, contados do cadastro, ou queira cancelar seu cadastro e/ou deseja fazer a portabilidade dos dados, poderá fazê-los a qualquer momento, de forma gratuita, entrando em contato pelo e-mail contato@constal.com.br.</p>
<p>A Constal cumprirá com o arrependimento, cancelamento ou portabilidade dentro do prazo razoável de até 15 (quinze) dias, salvo quando a lei o dispuser de modo diverso.</p>
<p>Importante ressaltar que o arrependimento e cancelamento, não impedirão a Constal de cobrar valores que possam estar em abertos sem o devido pagamento ou a adoção de medidas legais necessárias para efetivar e assegurar o recebimento e ressarcimento, a segurança, o sigilo e a privacidade da Plataforma.  </p>
<p>Ademais, ainda que Você se arrepende e/ou cancele, alguns dados e informações poderão ser mantidos para cumprimento das exigências legais, quando necessários.</p>
<h4>ALTERAÇÃO E MODIFICAÇÃO NA POLÍTICA DE PRIVACIDADE</h4>
<p>Preocupados com o aprimoramento e cumprimento das leis, a Constal poderá atualizar e modificar essa política de privacidade sempre que for imprescindível e pertinente para prestar o serviço. Desta maneira, recomendamos visitar periodicamente essa política para que possa verificar e acompanhar as mudanças, toda e quaisquer alterações serão comunicadas antecipadamente com 30 (trinta) dias, da entrada em vigor da nova política, que serão considerados lidos e aceitos com a continuação do cadastro. </p>
<h4>DA PROPRIEDADE INTELECTUAL.</h4>
<p>Você reconhece que é de titularidade exclusiva da Constal a propriedade intelectual empregada na plataforma e em qualquer material criado ou disponibilizado em sua Conta Digital, inclusive direito autorais e patrimoniais. E, ainda, que a marca, nome empresarial, domínio, logos, insígnias, layout, código-fonte, trade dress, funcionalidades tecnológicas, modelo de negócio, banco de dados, estrutura de rede e sistemas, estão protegidos pelas Leis e tratados internacionais e que são pertencentes a Constal. </p>
<p>Ressaltamos que o uso indevido, irregular, ilícito e a reprodução total ou parcial dos referidos conteúdos são proibidos irrevogavelmente.</p>
<h4>DO SUPORTE TÉCNICO</h4>
<p>A Constal disponibiliza estrutura de atendimento, acerca da funcionalidade da plataforma, 24 horas por dia, sete dias por semana, com ferramentas de contato e equipe especializada de suporte para o tratamento de qualquer dúvida, reclamação, sugestão ou comentário que Você possua com relação a este termo de uso, para isso poderá nos ligar (12) 9 99797-2034 e/ou enviar e-mail para contato@constal.com.br. </p>
<p>Informamos que a resposta à sua demanda acontecerá dentro de até 5 (cinco) dias úteis e no horário comercial das 9h às 17h de segunda à sexta-feira e nos finais de semana exceto domingo e feriado das 9h às 12h, e em conformidade com a possibilidade técnica, salvo quando isso decorrer de funções de terceiros, tais como concessionária de energia elétrica, provedores de serviços de internet e outros.</p>
<h4>DOS SOLUÇÕES DE CONTROVÉRSIAS.</h4>
<p>Com o intuito de resolver consensualmente todo e qualquer conflito ou controvérsia de interpretação e violação das obrigações e direitos, decorrente deste termo, a Constal e o Usuário asseguram que buscarão solucionar com boa-fé e transparência, respeitada a lealdade e finalidade específica do presente instrumento, preferencialmente de forma amigável pelos meios alternativos de solução de conflito: autocomposição e conciliação. </p>
<h4>DISPOSIÇÕES FINAIS.</h4>
<p>O Usuário reitera que possui a plena capacidade jurídica e que não há qualquer conflito de interesses que possa comprometer à sua capacidade para celebração do presente termo, bem como que leu atenciosamente todas às cláusulas e condições, compreendendo, inclusive, as suas consequências jurídicas, e que assume integralmente as obrigações contidas neste Termo.</p>
<p>A presente política de privacidade constitui o único e integral acordo entre o titular dos dados e informações em relação aos assuntos aqui tratados, substituindo todos os outros documentos e entendimentos orais mantidos entre esses, anteriores à presente data.</p>
<p>O Usuário concorda e aceita em indenizar, ressarcir e/ou isentar e manter isentos irrestritamente de quaisquer responsabilidade a Constal, seus diretores, sócios, conselheiros, empregados e representantes, das reclamações, processos, perdas, pagamentos, despesas, custas judiciais, inclusive arbitragem, conciliadores, mediadores e honorários advocatícios, que vierem a ocorrer e existir extrajudicial ou judicialmente, resultantes dos danos materiais, morais, perdas de uma chance, ofensas, violações, irregularidades que causar, vier a causar ou sofrer direta ou indiretamente decorrentes do uso da Plataforma.</p>
<p>Ao Usuário não é permitido anunciar produtos expressamente proibidos pela legislação vigente ou pelos Termos e condições gerais de uso do site, que não possuam a devida autorização específica de órgãos reguladores competentes, ou que violem direitos de terceiros;</p>;
<p>Você concorda que a Constal poderá livremente ceder e transferir a terceiros a qualquer título os direitos e deveres deste termo.</p>
<p>Na hipótese de qualquer cláusula ou disposição desta política de privacidade ser declarada nula ou inexequível, tal nulidade ou inexequibilidade não afetará quaisquer outras cláusulas, termos ou disposições aqui contidas, as quais permanecerão em pleno vigor e efeito, desde que o seu objeto não tenha sido alterado ou prejudicado.</p>
<p>Cabe ressaltarmos, nenhuma transmissão de dados na Internet é 100% segura, por isso Você deve adotar medidas de segurança, cuidado e sigilo, siga e respeite as orientações deste documento e evite compartilhar login e senhas com terceiros e conectar seus aparelhos em redes públicas.</p>
<p>Esclarecemos que esta política de privacidade está regida e será interpretada exclusivamente de acordo com as Leis Brasileiras, por isso, em prestígio a solução extrajudicial empenharemos esforços para solução amigável, contudo caso necessário a solução judicial será realizada pelos tribunais do foro de seu domicilio. </p>
<p>Honrados com sua escolha, a Constal agradece à atenção e confiança.</p>
<p>Abraços,</p>
<h4>Constal</h4>
              </p>
              <div className="buttonsNew">
                {/* <button >Cancelar</button> */}
                <button
                type="button" 
                onClick={closeModal}
                >voltar</button>
              </div>
            </ModalContent>
          </div>
        </Modal>
      </ModalContainerVendedor>
    </>
  );
}
/*
TERMOS DE USO E POLÍTICA DE PRIVACIDADE
Olá! 
Bem-vindo à Constal. 
Antes de fornecer qualquer tipo de informação e dado, leia atentamente os presentes termos de uso e política de privacidade, esses lhe ajudarão a utilizar nossa Plataforma de Marketplace.
Fique tranquilo, os dados pessoais fornecidos a Constal estarão protegidos, resguardados e terão absoluto sigilo e confidencialidade.
Informamos que para o utilizar nossos serviços de intermediação são necessários consentimento e aceite, por isso ao acessar e utilizar o serviço da plataforma Constal, Você inequivocamente concorda e aceita com as condições e recomendações apresentadas nesses termos.
DEFINIÇÕES. 
Para facilitar a compreensão do presente termo, entende-se por:
     Usuário: a pessoa natural (física) ou pessoa jurídica que consentiu e aderiu eletronicamente ao presente termo ao selecionar a concordância e clicar no “aceite”, que forneceu de forma livre, gratuita e voluntária seus dados e que gerencia sua conta, na Plataforma Constal.   Salvo quando expressamente indicado em contrário, os termos “você”, “seu” ou “sua” se referem ao Usuário.
     Profissional Autônomo: profissional especializado de formação técnica especifica para o setor da construção civil, tais como, mas não limitado a pedreiro, encanador, eletricista, marceneiro, limpeza, mestre de obras, segurança, arquiteto, paisagista e engenheiros.
     Empresa Credenciada e Independente: pessoa jurídica, prestadora de serviço ou fornecedora de produtos, equipamentos e materiais para ramo da construção civil, com registro regular nos órgãos competentes, tais como, mas não limitado loja de materiais para construção, engenharia, incorporadora, imobiliária, terraplanagem, locação de equipamentos, segurança, manutenção e guarda de materiais e equipamentos.
     Conta Digital: é a conta do Usuário que após consentir, ele inseriu e forneceu livremente às informações e dados de sua titularidade. Nessa conta, a Constal viabiliza meios e disponibiliza funções e recursos tecnológicos e digitais, para que o Usuário possa ter contato e acesso diretamente com outros Usuários, profissionais autônomos e empresas credenciadas e independentes, além disso poderá o Usuário acompanhar, selecionar, divulgar, visualizar, interagir, negociar e contratar serviços ou adquirir produtos, materiais e equipamentos, para o setor da construção civil, sem qualquer intervenção da Constal.
     Contrato: é o presente termo de uso da plataforma Constal, ao qual você adere e concorda.
QUEM SOMOS.
Somos a Plataforma de Marketplace Constal, nosso CNPJ é 36.633.924/0001-72 e estamos localizados à Rua Cardoso Pimentel, nº 660, sala 1, Bairro Centro, Município de Porto Feliz, Estado de São Paulo, CEP: 18.540-000. 
Caso precise falar com a gente poderá mandar e-mail para contato@constal.com.br 
O QUE SOMOS E NÃO SOMOS
O que a Constal é? Intermediadora, o que significa que é uma ferramenta digital, tecnológica de auxílio na intermediação, ou seja, é complementar à cadeia da construção civil, pois apenas presta o serviço de facilitadora e fornecedora de recursos tecnológicos, por meio da plataforma digital, para a eventual e potencial conexão dos Usuários pessoas naturais (físicas) ou jurídicas, que possuem desejos individuais, mas em comum.
O que a Constal, não é? Não é fornecedora de produtos, materiais e equipamentos para o setor da construção civil, tampouco prestadora de serviço deste setor, em razão disso a Constal não possui, nem tem qualquer responsabilidade, gerência, intervenção, participação sobre as informações, inclusive validade, garantia, legalidade, qualidade e quantidade dos produtos, materiais, equipamentos e serviços anunciados ou divulgados pelos Usuários, profissionais autônomos e empresas credenciadas e independentes, por meio da plataforma.
Por ter caráter complementar e acessório, a Constal não tem ou existe subordinação, hierarquia, joint-venture, sociedade, grupo-econômico, vínculo empregatício ou trabalhista com Você, Usuário, com o Profissional Autônomo e com as Empresas Credenciadas e Independentes, como resultado da concordância e aceite deste termo ou pelo uso da Plataforma.
A Constal também não garante sucesso, êxito, aumento nas vendas, receitas ou lucro, nem que ao usar a plataforma haverá interações entre os usuários.
QUAL O OBJETIVO
Os presentes termos de uso e política de privacidade objetiva informar e esclarecer o compromisso que a Constal tem com a privacidade e segurança dos dados pessoais seus Usuários, em respeito a dignidade da pessoa humana, na forma e para os efeitos da lei.
Importante lembrar Você, que a Plataforma não usa nenhum tipo cookies e cumpre com todas as leis, aplicáveis ao caso, em especial a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).
Aqui, Você encontrará de forma clara e precisa as informações da Constal, e, ainda, conhecerá as condições e recomendações de uso da Plataforma, bem como suas obrigações, deveres e direitos como Usuário. 
INÍCIO E DURAÇÃO 
Os efeitos e eficácia dos presentes termos e condições e política de privacidade têm início na data de seu aceite e concordância, e a duração deles é por prazo indeterminado ou enquanto não sobrevier versão atualizada destes termos, obrigando as partes, seus herdeiros e sucessores.
QUAIS DADOS COLETAMOS E PORQUE COLETAMOS.
Lembre-se ao consentir Você declarou inequivocamente que leu, entendeu e aceitou integralmente as recomendações e condições estabelecida nestes termos de uso e política de privacidade. 
Feita essa ressalva, cabe informarmos aos Usuários que, para o serviço de intermediação seja prestado adequadamente e cumpra com sua finalidade, a Constal poderá solicitar eventualmente as seguintes informações e dados pessoais para cadastro e abertura de sua conta digital:
    a) [o]
    b) [o]
    c) [o]
Esses dados são fundamentais para a individualização e identificação dos Usuários, mas também para acesso e uso da sua conta digital, na Plataforma Constal. Os dados e informações serão coletados por meio de informações fornecidas e inseridas por quem consentiu e deseja ser Usuário, por essa razão pedimos que ao fornece-los ou inseri-los faça e aja com cautela e segurança e preserve o sigilo, confidencialidade e restrição deles.
Nunca divulgue ou compartilhe suas informações, seus dados, login e senha, nem forneça ou permita o acesso de terceiros em sua conta digital, ela é individual e pessoal.
Você concorda e se compromete que é e manterá sempre como verdadeiro, autêntico, preciso, exato, lícito e atualizado toda e qualquer informação e dado pessoal que inserir e fornecer, bem como divulgar ou anunciar relacionado ao serviço, produto, equipamento e material, na Plataforma Constal. 
Desta maneira é de responsabilidade exclusiva dos Usuários, mas não se limitando aos danos diretos ou indiretos, materiais, morais, lucro cessante, a perda e vazamento ou compartilhamento indevido de dados, erros, imprecisões, ilícitos e violações que vier a causar a terceiros e a Plataforma, e, ainda, as correções, atualizações, manutenções, reparos e trocas que se fizerem necessários nos produtos, equipamentos, materiais e serviços divulgados na plataforma
A Constal assegura que adota e tomará as necessárias providencias para assegurar a segurança, a confidencialidade e a proteção às informações e dados pessoal dos Usuários, armazenando-os em meios que dificultam o acesso de terceiros e que utilizem a criptografia de ponta a ponta, visando evitar a ocorrência de danos ou prejuízos a Você.
Contudo, Você está ciente e consente que imprevistos ocorrem e que nem tudo está sob o controle da Constal, de modo que a plataforma poderá eventualmente sofrer interrupções e oscilações devido manutenções técnicas nos sistemas, tais como internet, telecomunicação e energia elétrica, há também a possibilidade de ocorrer casos fortuitos ou força maior e ações de terceiros que impeçam a prestação ou acesso ao serviço, que todos essas situações a Constal e seus representantes não são responsáveis.
REQUISITOS INDISPENSÁVEIS PARA ACESSO E USO DA PLATAFORMA.
Informamos que para o acesso e uso da plataforma Constal são indispensáveis que o Usuário, conjuntamente:
    a) tenha lido, aceito e concordado com os presentes termos e condições;
    b) ter mais de 18 anos, para pessoas físicas; 
    c) seja o titular dos dados;
    d) tenha a capacidade civil e plena para compreender e aceitar os presentes termos e esteja legalmente desimpedido de fazê-los; 
    e) faça o uso da plataforma de maneira ética e moral, com boa-fé e transparência nas relações e interações com outros Usuários; 
    f) realize os pagamentos em dia, caso exista, e arque com todos os tributos de sua responsabilidade, bem como obrigações acessórias, conforme legislação aplicável.
    g) apenas anuncie ou divulgue produtos, equipamentos, materiais e serviços lícitos, legais e permitidos ou, de uso restrito e controlado de acordo com as normas legais, inclusive sanitárias, criança e adolescente, consumerista, segurança e ambiental. 
    h) não divulgue e nem compartilhe a terceiros qualquer informação relacionada a plataforma.
    i) se, responsabilize e responda exclusivamente por seus atos e de seus colaboradores e 
    j) se, responsabilize exclusive e integralmente pelas obrigações que vierem a contrair entre si ou com profissional autônomo ou empresa credenciada independente.
No caso, do Usuário descumprir um desses requisitos, a ausência ou a inveracidade desses, autoriza a Constal a advertir, impedir, limitar, suspender, cancelar e excluir parcial ou integralmente o acesso e as funcionalidades da conta digital e o conteúdo gerado, divulgado ou anunciado dos produtos, equipamentos, materiais e serviços, pelo Usuário na plataforma, sem que isso caracterize inobservância ou restrição à liberdade de expressão, comunicação e manifestação de pensamento ou discriminação, e, ainda, sequer direitos a indenização ou ressarcimento. 
Atenção para a idade. Ela se refere a idade mínima de 18 (dezoito) anos que o Usuário, pessoa física, necessita ter para acessar e usar os serviços da plataforma. Excepcionados os casos legais, se a idade for insuficiente ou não existir o discernimento cognitivo para compreender e consentir, o responsável legal deverá aceitar as recomendações e condições deste termo em nome do Usuário.
O Usuário reconhece que se cadastrou, optou e aceitou utilizar a Plataforma Constal de forma livre e espontânea, que o faz por sua conta e risco exclusivos e que compreende que a Constal é apenas ferramenta de meio que tem por objetivo auxiliar na intermediação dos Usuários na divulgação e contratação para o setor da construção civil.
Compreende também, que a Constal executará os serviços tecnológicos exclusivamente mediante ordem do Usuário, geradas a partir da Plataforma, utilizando as informações inseridas e existentes na respectiva conta digital.
FINALIDADE DO TRATAMENTO DOS DADOS.
Todos os dados e informações fornecidos pelo titular são essenciais para que a Constal atenda e preste legitimamente seus serviços de fornecer plataforma digital, para (i.) intermediar e conectar eventual e potencialmente pessoas naturais (físicas) ou jurídicas de forma individualizada, segura e precisa, (ii.) os Usuários divulgar e contratar produtos, equipamentos, materiais e serviços do setor da Construção Civil, (iii.) cobrar pelos serviços de intermediação e conexão prestados e (iv.) para cumprir obrigações legais.
Esclarecemos que o tratamento de dados também poderá ser feito para divulgação de conteúdo, realização de propaganda e marketing e oferta de produtos.
COMPORTAMENTOS VEDADOS AO USUÁRIO
O Usuário compreende e aceita que é rigorosamente proibido inserir, violar, reproduzir, imitar, copiar, suprimir, excluir, fotocopiar, filmar, gravar, invadir, implantar, sequestrar, retirar, modificar, destruir e inviabilizar qualquer propriedade intelectual, sistema ou dispositivo da plataforma Constal, bem como expressamente vedado conceder, permitir, deixar, facilitar, participar ou concorrer de alguma forma para que terceiros pratiquem aquelas condutas.
COMPARTILHAMENTO DOS DADOS.
Para melhor atender ao titular dos dados e prestar o serviço de intermediação e conexão de melhor qualidade, a Constal poderá compartilhar os dados e informações fornecidos e inseridos na plataforma aos seguintes parceiros _____. Os quais possuem regras próprias para uso e política de privacidade, sem que a Constal tenha qualquer gerência ou subordinação sobre o conteúdo.
Afirmamos a Constal e seus parceiros são individuais sem qualquer relação jurídica ou vínculo societário, de modo que agem com total autonomia e liberdade. 
Fique calmo, a Constal não divulgará nenhuma informação e nenhum dado fornecido sem a prévia autorização do titular, exceto em caso de determinação judicial ou legal.
PELA INTERMEDIAÇÃO COBRAMOS
Pelos serviços prestados de intermediadora, Você pagará à Constal o valor correspondente a comissão, livre de impostos e custos e despesas diretas e indiretas. Para facilitar a pagamento o Usuário autoriza que a Constal faça a retenção do valor transacionado por meio da plataforma, sem nada a reclamar, além disso a comissão poderá variar de acordo com a quantidade e frequência de interações e contratações feitas por meio da plataforma. 
A Constal se reserva ao direito de alterar à sua política de preços, de tempos em tempos, sempre que entender cabível e pertinente ao menos anualmente, para manter o equilíbrio financeiro dos serviços da plataforma. Todas e quaisquer alterações e reajustes no preço, na forma e meio de pagamento e cobrança serão comunicados antecipadamente com 30 (trinta) dias, da entrada em vigor dos novos valores, que serão considerados aceitos com a continuação do uso da plataforma após a mudança.
Se você não concordar com a alteração, poderá encerrar e cancelar seu cadastro, desde que antes da alteração de valores passe a produzir efeito. Para isso, veja como cancelar seu serviço no item abaixo.
Para saber mais clique aqui e leia os termos de pagamento.
ARREPENDIMENTO E CANCELAMENTO DO CADASTRO
Contente com o interesse em nossos serviços, a Constal confia na fidelização do titular dos dados e informações pela facilidade e oportunidade geradas com a conexão. Contudo, caso o titular se arrependa em até 7 (sete) dias, contados do cadastro, ou queira cancelar seu cadastro e/ou deseja fazer a portabilidade dos dados, poderá fazê-los a qualquer momento, de forma gratuita, entrando em contato pelo e-mail contato@constal.com.br.
A Constal cumprirá com o arrependimento, cancelamento ou portabilidade dentro do prazo razoável de até 15 (quinze) dias, salvo quando a lei o dispuser de modo diverso.
Importante ressaltar que o arrependimento e cancelamento, não impedirão a Constal de cobrar valores que possam estar em abertos sem o devido pagamento ou a adoção de medidas legais necessárias para efetivar e assegurar o recebimento e ressarcimento, a segurança, o sigilo e a privacidade da Plataforma.  
Ademais, ainda que Você se arrepende e/ou cancele, alguns dados e informações poderão ser mantidos para cumprimento das exigências legais, quando necessários.
ALTERAÇÃO E MODIFICAÇÃO NA POLÍTICA DE PRIVACIDADE
Preocupados com o aprimoramento e cumprimento das leis, a Constal poderá atualizar e modificar essa política de privacidade sempre que for imprescindível e pertinente para prestar o serviço. Desta maneira, recomendamos visitar periodicamente essa política para que possa verificar e acompanhar as mudanças, toda e quaisquer alterações serão comunicadas antecipadamente com 30 (trinta) dias, da entrada em vigor da nova política, que serão considerados lidos e aceitos com a continuação do cadastro. 
DA PROPRIEDADE INTELECTUAL.
Você reconhece que é de titularidade exclusiva da Constal a propriedade intelectual empregada na plataforma e em qualquer material criado ou disponibilizado em sua Conta Digital, inclusive direito autorais e patrimoniais. E, ainda, que a marca, nome empresarial, domínio, logos, insígnias, layout, código-fonte, trade dress, funcionalidades tecnológicas, modelo de negócio, banco de dados, estrutura de rede e sistemas, estão protegidos pelas Leis e tratados internacionais e que são pertencentes a Constal. 
Ressaltamos que o uso indevido, irregular, ilícito e a reprodução total ou parcial dos referidos conteúdos são proibidos irrevogavelmente.
DO SUPORTE TÉCNICO
A Constal disponibiliza estrutura de atendimento, acerca da funcionalidade da plataforma, 24 horas por dia, sete dias por semana, com ferramentas de contato e equipe especializada de suporte para o tratamento de qualquer dúvida, reclamação, sugestão ou comentário que Você possua com relação a este termo de uso, para isso poderá nos ligar (xx) ____- ___ e/ou enviar e-mail para contato@constal.com.br. 
Informamos que a resposta à sua demanda acontecerá dentro de até 5 (cinco) dias úteis e no horário comercial das 9h às 17h de segunda à sexta-feira e nos finais de semana exceto domingo e feriado das 9h às 12h, e em conformidade com a possibilidade técnica, salvo quando isso decorrer de funções de terceiros, tais como concessionária de energia elétrica, provedores de serviços de internet e outros.
DOS SOLUÇÕES DE CONTROVÉRSIAS.
Com o intuito de resolver consensualmente todo e qualquer conflito ou controvérsia de interpretação e violação das obrigações e direitos, decorrente deste termo, a Constal e o Usuário asseguram que buscarão solucionar com boa-fé e transparência, respeitada a lealdade e finalidade específica do presente instrumento, preferencialmente de forma amigável pelos meios alternativos de solução de conflito: autocomposição e conciliação. 
DISPOSIÇÕES FINAIS.
O Usuário reitera que possui a plena capacidade jurídica e que não há qualquer conflito de interesses que possa comprometer à sua capacidade para celebração do presente termo, bem como que leu atenciosamente todas às cláusulas e condições, compreendendo, inclusive, as suas consequências jurídicas, e que assume integralmente as obrigações contidas neste Termo.
A presente política de privacidade constitui o único e integral acordo entre o titular dos dados e informações em relação aos assuntos aqui tratados, substituindo todos os outros documentos e entendimentos orais mantidos entre esses, anteriores à presente data.
O Usuário concorda e aceita em indenizar, ressarcir e/ou isentar e manter isentos irrestritamente de quaisquer responsabilidade a Constal, seus diretores, sócios, conselheiros, empregados e representantes, das reclamações, processos, perdas, pagamentos, despesas, custas judiciais, inclusive arbitragem, conciliadores, mediadores e honorários advocatícios, que vierem a ocorrer e existir extrajudicial ou judicialmente, resultantes dos danos materiais, morais, perdas de uma chance, ofensas, violações, irregularidades que causar, vier a causar ou sofrer direta ou indiretamente decorrentes do uso da Plataforma.
Ao Usuário não é permitido anunciar produtos expressamente proibidos pela legislação vigente ou pelos Termos e condições gerais de uso do site, que não possuam a devida autorização específica de órgãos reguladores competentes, ou que violem direitos de terceiros;
Fica expressamente reservado a Constal o direito de utilizar todos os meios legais e possíveis para entrar em contato com você, bem como, a qualquer momento solicitar documentos e/ou dados adicionais que, a seu exclusivo critério considere necessários para verificar os dados cadastrais informados. 
Você concorda que a Constal poderá livremente ceder e transferir a terceiros a qualquer título os direitos e deveres deste termo.
Na hipótese de qualquer cláusula ou disposição desta política de privacidade ser declarada nula ou inexequível, tal nulidade ou inexequibilidade não afetará quaisquer outras cláusulas, termos ou disposições aqui contidas, as quais permanecerão em pleno vigor e efeito, desde que o seu objeto não tenha sido alterado ou prejudicado.
Cabe ressaltarmos, nenhuma transmissão de dados na Internet é 100% segura, por isso Você deve adotar medidas de segurança, cuidado e sigilo, siga e respeite as orientações deste documento e evite compartilhar login e senhas com terceiros e conectar seus aparelhos em redes públicas.
Esclarecemos que esta política de privacidade está regida e será interpretada exclusivamente de acordo com as Leis Brasileiras, por isso, em prestígio a solução extrajudicial empenharemos esforços para solução amigável, contudo caso necessário a solução judicial será realizada pelos tribunais do foro de seu domicilio. 
Honrados com sua escolha, a Constal agradece à atenção e confiança.
Abraços,
Constal
*/