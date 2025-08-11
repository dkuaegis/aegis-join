import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import Authentication from "./components/auth/authentication.tsx";
import { Toaster } from "react-hot-toast";

// biome-ignore lint/style/noNonNullAssertion: The 'root' element is guaranteed to exist in the HTML.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Authentication>
        <Toaster 
          position="bottom-center"
        />
        <App />
      </Authentication>
    </BrowserRouter>
  </StrictMode>
);
