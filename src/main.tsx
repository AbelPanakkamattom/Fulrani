import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { HashRouter } from "react-router-dom";   // 🔥 ADD THIS

createRoot(document.getElementById("root")!).render(
<HelmetProvider>
    <HashRouter>   {/* 🔥 ADD THIS */}
    <App />
    </HashRouter>
</HelmetProvider>
);