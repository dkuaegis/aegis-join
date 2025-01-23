import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ValidationProvider } from "./lib/context/validationContext.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ValidationProvider>
            <App />
        </ValidationProvider>
    </StrictMode>
);
