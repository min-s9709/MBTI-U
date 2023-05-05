import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
