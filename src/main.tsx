import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import Authentication from "./components/auth/authentication.tsx";

// biome-ignore lint/style/noNonNullAssertion: The 'root' element is guaranteed to exist in the HTML.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authentication>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Authentication>
  </StrictMode>
);
