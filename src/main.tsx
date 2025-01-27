import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-a1nh5znnx108bui4.us.auth0.com"
      clientId="BrH1iIRb0zkPTOfnxGN3Ljx8efNBuZdC"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
