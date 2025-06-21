import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProjectProvider } from "./context/ProjectContext.jsx";
import { ScrollTop } from "./components/ScrollTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectProvider>
      <BrowserRouter>
        <ScrollTop />
        <App />
      </BrowserRouter>
    </ProjectProvider>
  </StrictMode>
);
