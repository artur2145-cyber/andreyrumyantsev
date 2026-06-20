import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css" // base tokens/utilities first, so component CSS can override
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
