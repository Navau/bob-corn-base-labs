import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeSocket } from "./api/corn.socket";

function Main() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initializeSocket(); // Espera a que el socket esté listo
      setIsReady(true); // Marca la aplicación como lista para renderizar
    };

    setup();
  }, []);

  if (!isReady) {
    return <div>Cargando...</div>; // Loader mientras espera
  }

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
