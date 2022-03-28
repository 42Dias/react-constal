import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Routes from "./routes";
import GlobalStyles from "./styles/global";
import { CartProvider } from "./hooks/useCart";
import CreditCardProvider from "./contexts/CreditCardContext";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <CartProvider>
        <CreditCardProvider>
          <GlobalStyles />
          <Routes />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </CreditCardProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
