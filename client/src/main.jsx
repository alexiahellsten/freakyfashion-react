import { BrowserRouter } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { BasketProvider } from "./contexts/BasketContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <BasketProvider>
        <App />
      </BasketProvider>
    </StrictMode>
  </BrowserRouter>
);
