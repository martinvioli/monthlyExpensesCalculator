import { useState } from "react";
import TablaPrincipal from "./components/Tablas/TablaPrincipal";
import { CalculadoraProvider } from "./contexts/calculadora.context";
import ModalPrincipal from "./components/Modales/ModalPrincipal";

export default function App() {
  const [isMPOpen, setIsMPOpen] = useState<boolean>(true);

  return (
    <CalculadoraProvider>
      <TablaPrincipal />
      <ModalPrincipal
        isOpen={isMPOpen}
        onClose={() => setIsMPOpen(false)}
        onAccept={() => setIsMPOpen(false)}
      />
    </CalculadoraProvider>
  );
}
