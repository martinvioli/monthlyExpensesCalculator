import { createContext, useMemo, useState } from "react";
import ICompraPrimaria from "../interfaces/compra-primaria.interface";
import ICompraSecundaria from "../interfaces/compra-secundaria.interface";

export interface ICalculadoraContext {
  comprasPrimarias: ICompraPrimaria[];
  setComprasPrimarias: React.Dispatch<React.SetStateAction<ICompraPrimaria[]>>;
  comprasSecundarias: ICompraSecundaria[];
  setComprasSecundarias: React.Dispatch<
    React.SetStateAction<ICompraSecundaria[]>
  >;
}

export const CalculadoraContext = createContext({} as ICalculadoraContext);

export function CalculadoraProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [comprasPrimarias, setComprasPrimarias] = useState<ICompraPrimaria[]>(
    []
  );
  const [comprasSecundarias, setComprasSecundarias] = useState<
    ICompraSecundaria[]
  >([]);

  const providerValue = useMemo(
    () => ({
      comprasPrimarias,
      setComprasPrimarias,
      comprasSecundarias,
      setComprasSecundarias,
    }),
    [comprasPrimarias, comprasSecundarias]
  );

  return (
    <CalculadoraContext.Provider value={providerValue}>
      {children}
    </CalculadoraContext.Provider>
  );
}
