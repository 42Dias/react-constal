import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 5%;

  @keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  }

  .loading-spinner {
    width: 50px;
    height: 50px;

    /* 0549c1 */
    /* border: 10px solid #f3f3f3; Light grey */
    border: 10px solid #c8c8c8; /* Light grey */
    border-top: 10px solid #0549c1; /* Black */
    /* border-top: 10px solid #383636; Black */
    border-radius: 50%;
    
    animation: spinner 1.5s linear infinite;
    /* animation: spinner 1.5s ease infinite; */


    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px;
    transition: all .5s;


    display: ${props => props.theme.displayIcon || 'block'};
  }

`;

Container.defaultProps = {
  theme: {
    height: '100vh',
  }
}




